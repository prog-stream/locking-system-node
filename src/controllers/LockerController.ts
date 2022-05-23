import {Request, Response} from "express";

export const test = async (req: Request, res: Response) => {
  try {
    res.send("test successfully");
  } catch (error) {
    console.log(error);
  }
};
