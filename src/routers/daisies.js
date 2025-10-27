import { Router } from "express";
import * as flowersControllers from "../controllers/flowers.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
// import { ctrlWrapper } from "../utils/ctrlWrapper.js";
// import { upload } from "../middlwares/multer.js";

//  37. Створення роуту
const routers = Router();

// console.log('routers', routers);

routers.get('/', flowersControllers.getFlowersController);
routers.post(
  '/daisies',
  ctrlWrapper(flowersControllers.createFlowerController),
);

// 41.5 Додавання до завантаження масиву фото (до 3 шт) (upload.array('photos', 10))
// routers.patch(
//   '/photo/:id',
//   upload.single('photo'),
//   ctrlWrapper(flowersControllers.patchFlowerController),
// );

// routers.patch(
//   '/photoWeb/:id',
//   upload.single('photoWeb'),
//   ctrlWrapper(flowersControllers.patchFlowerWebController),
// );

export default routers;
