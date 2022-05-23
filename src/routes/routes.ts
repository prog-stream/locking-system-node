import express, {Router} from "express";
import {test, addLocker, openLock} from "./../controllers/LockerController";

const router: Router = express.Router();
router.get("/", test);
router.post("/locker", addLocker);
router.post("/locker", openLock);

export default router;
