import {Request, response, Response} from "express";
import {MqttClient} from "mqtt";
import {Locker} from "../models/locker.model";
import LockerService from "../services/LockerService";

export const test = async (req: Request, res: Response) => {
  try {
    res.send("test successfully");
  } catch (error) {
    console.log(error);
  }
};

export const openLock = async (req: Request, res: Response) => {
  try {
    const client = (await LockerService.connection()) as MqttClient;
    client.on("connect", () => {
      console.log("client connected");
      client.publish("devlock", "open");
      client.subscribe("devlock", (err: Error) => {});
    });

    client.on("message", (topic: string, message: Buffer) => {
      // message is Buffer
      console.log(topic, message.toString());
      if (topic === "devlock") {
        return res
          .status(201)
          .json({code: 200, message: "Lock open successfully", success: true});
      }
      client.end();
    });
    client.on("error", (err: Error) => {
      res
        .status(400)
        .json({code: 400, message: "something went wrong", success: false});
      client.end();
    });
  } catch (error) {
    console.log(error);
  }
};

export const addLocker = async (req: Request, res: Response) => {
  try {
    const locker = await Locker.create({...req.body});
    return res.status(201).json(locker);
  } catch (error) {
    console.log(error);
  }
};
