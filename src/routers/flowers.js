import { Router } from "express";
import * as flowersControllers from "../controllers/flowers.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

//  37. Створення роуту
const flowersRouters = Router();

flowersRouters.get('/', flowersControllers.getFlowersController);
flowersRouters.post(
  '/flower',
  ctrlWrapper(flowersControllers.createFlowerController),
);

export default flowersRouters;


// 36. Попереднє в файлі server.js
// 38. Наступне в файлі controllers/flowers.js
