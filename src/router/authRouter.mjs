import { Router } from "express";
import authController from "../controller/authController.mjs";

const authRouter = Router();

authRouter.get("/", authController.test);

export default authRouter;
