import { Router } from "express";
import chrysanthemumsRouter from './flowers.js';
import daisiesRouter from './daisies.js';

// import gardensRouter from "./gardens.js";
// import authRouter from "./auth.js";
// import userRouter from './user.js';

const router = Router();

  // Змінна finishingsRouter - це маршрут finishings + Router
router.use(chrysanthemumsRouter);
router.use(daisiesRouter);
  // Змінна gardensRouter - це маршрут gardens + Router
//   router.use(gardensRouter);
// router.use(authRouter);
// router.use(userRouter);

export default router;
