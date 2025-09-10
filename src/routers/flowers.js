import { Router } from "express";
import * as flowersControllers from "../controllers/flowers.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { upload } from "../middlwares/multer.js";

//  37. Створення роуту
const flowersRouters = Router();

flowersRouters.get('/', flowersControllers.getFlowersController);
flowersRouters.post('/flower', ctrlWrapper(flowersControllers.createFlowerController),
);

// 41.5 Додавання до завантаження масиву фото (до 3 шт) (upload.array('photos', 10))
flowersRouters.patch(
  '/photo/:id',
  upload.single('photo'),
  ctrlWrapper(flowersControllers.patchFlowerController),
);

flowersRouters.patch(
  '/photoWeb/:id',
  upload.single('photoWeb'),
  ctrlWrapper(flowersControllers.patchFlowerWebController),
);

export default flowersRouters;


// 36. Попереднє в файлі server.js
// 38. Наступне в файлі controllers/flowers.js

// 41.4 Попереднє в файлі index.js
// 41.6 Наступне в файлі controllers/flowers.js
