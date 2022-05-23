import {Request, Response} from "express";
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
    const result = await LockerService.connection();
    console.log("result: " + JSON.stringify(result));
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
