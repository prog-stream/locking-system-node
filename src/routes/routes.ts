import {test} from "../controllers/LockerController";
import express, {Router} from "express";

const router: Router = express.Router();
router.get("/", test);

export default router;
