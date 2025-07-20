import { Router } from "express";
import * as flowersControllers from "../controllers/flowers.js";

const flowersRouters = Router();

flowersRouters.get("/", flowersControllers.getFlowersController);

export default flowersRouters;
