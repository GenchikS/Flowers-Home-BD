import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

import { registerUserSchema } from "../validation/register.js";
import * as userControllers from "../controllers/auth.js";
import { validateBody } from "../middlwares/validateBody.js";





const routers = Router();


routers.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(userControllers.createUserController),
);

routers.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(userControllers.createUserController),
);


export default routers;
