import { Router } from "express";
import chrysanthemumsRouter from './flowers.js';
import daisiesRouter from './daisies.js';
import authRouter from "./auth.js";
// import userRouter from './user.js';

const router = Router();

  // Змінна chrysanthemumsRouter - це маршрут finishings + Router
router.use(chrysanthemumsRouter);
router.use(daisiesRouter);
router.use(authRouter);
// router.use(userRouter);

export default router;
