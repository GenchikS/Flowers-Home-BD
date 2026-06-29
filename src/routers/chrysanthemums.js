import { Router } from "express";
import * as flowersControllers from "../controllers/flowers.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { upload } from "../middlwares/multer.js";

//  37. Створення роуту
const routers = Router();

routers.get('/', flowersControllers.getFlowersController);
// routers.get(
//   '/admin/flowers/chrysanthemums/delete',
//   flowersControllers.getFlowersIdController,
// );

routers.post(
  '/admin/flowers/chrysanthemums/add',
  ctrlWrapper(flowersControllers.createFlowerController),
);

// 41.5 Додавання до завантаження масиву фото (до 3 шт) (upload.array('photos', 10))
routers.patch(
  '/admin/flowers/chrysanthemums/photo/:id',
  upload.single('photo'),
  ctrlWrapper(flowersControllers.patchFlowerController),
);


routers.patch(
  '/admin/flowers/chrysanthemums/photoWeb/:id',
  upload.single('photoWeb'),
  ctrlWrapper(flowersControllers.patchFlowerWebController),
);

routers.delete(
  '/admin/flowers/flowers/chrysanthemums/delete/',
  ctrlWrapper(flowersControllers.deleteFlowerWebController),
);

export default routers;


// 36. Попереднє в файлі server.js
// 38. Наступне в файлі controllers/flowers.js

// 41.4 Попереднє в файлі index.js
// 41.6 Наступне в файлі controllers/flowers.js
