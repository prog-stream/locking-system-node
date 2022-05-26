import {Request, Response} from "express";
import {Locker} from "../models/locker.model";
import MqttHandler from "../services/MqttHandler";

export const test = async (req: Request, res: Response) => {
  try {
    res.send("test successfully");
  } catch (error) {
    console.log(error);
  }
};

export const openLock = async (req: Request, res: Response) => {
  try {
    const mqttClient = new MqttHandler();
    await mqttClient.connect();

    mqttClient.openLock(req.body.topic);
    setTimeout(() => {
      if (mqttClient.sendLockStatus() === "opened") {
        return res
          .status(200)
          .json({code: 200, message: "Lock successfully", success: true});
      } else {
        return res
          .status(400)
          .json({code: 200, message: "Something went wrong", success: false});
      }
    }, 1000);
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
