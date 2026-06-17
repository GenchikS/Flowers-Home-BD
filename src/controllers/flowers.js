import { errorHandler } from "../middlwares/errorHandler.js";
import {
  createFlower,
  patchFlower,
  getAllFlowers,
  patchWebFlower,
} from '../services/flowers.js';
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
// import * as path from 'node:path';
import { getEnvValue } from "../utils/getEnvValue.js";
import createHttpError from "http-errors";
// import { parsePaginationParams } from "../utils/parsePaginatiomParams.js";


const enableCloudnary = getEnvValue('ENABLE_CLOUDNARY');

// 38. Створення контролеру getFlowersController
export const getFlowersController = async (req, res) => {
  // const { page, perPage, color, titleSource } = parsePaginationParams(
  //   req.query,
  // );
  // console.log('flower', req.query);
try {
  const flowersAllProducts = await getAllFlowers(req.query);
    // console.log(`flowersProducts`, flowersAllProducts);
    res.status(200).json({
      data: flowersAllProducts,
    });
} catch (error) {
  errorHandler;
}
};

// 36. Попереднє в файлі routers/flowers.js
// 39. Наступне в файлі controllers/flowers.js

export const createFlowerController = async (req, res) => {
  const addFlower = await createFlower(req.body);
  res.status(201).json({
      status: 201,
      message: 'Successfully created a flower!',
      data: addFlower,
    });
};



export const patchFlowerController = async (req, res, next) => {
  const { id } = req.params;
  const photo = req.file;
  // console.log(`photo`, photo);

  let photoUrl = null; //  пуста

  if (photo) {
    // console.log(`req.file`, req.file);
    if (enableCloudnary === 'true') {
//    // console.log(`enableCloudnary`, enableCloudnary);
      photoUrl = await saveFileToCloudinary(photo, 'flowershome/photo');
      // console.log("photoUrl", photoUrl);
  } else {
    // console.log('photo else', photo);
      photoUrl = await saveFileToUploadDir(req.file); //  якщо приходить файл, то передаємо для переміщення
      // photoUrl = path.join('uploads', req.file.filename); //  передаємо відносний шлях в корінь проєкту в папку uploads (на випадок зміни шляху). Папку uploads не вказувати
    }
}
  // // const body = req.body;
  // // console.log(`body`, body);
  const data = await patchFlower(id, photoUrl, { ...req.body });
  // console.log("data", data);

  if (!data) {
    throw createHttpError(404, `Not found`);
  }
  res.json({
    status: 200,
    message: `Successfully patched a flower!`,
    data: data,
  });
};


export const postFlowerWebController = async (req, res, next) => {
  const { id } = req.params;
  // console.log(`id`, id);
  // const userId = req.user.userId;
  const photoWeb = req.file;
  // console.log(`photoWeb`, photoWeb);

  let photoUrl = null; //  пуста

  if (photoWeb) {
    // console.log(`req.file`, req.file);
    if (enableCloudnary === 'true') {
      // console.log(`photoWeb 3`, photoWeb);
      //    // console.log(`enableCloudnary`, enableCloudnary);
      photoUrl = await saveFileToCloudinary(photoWeb, 'flowershome/photoWeb');
      // console.log("photoUrl", photoUrl);
    } else {
      // console.log('photo else', photo);
      photoUrl = await saveFileToUploadDir(req.file); //  якщо приходить файл, то передаємо для переміщення
      // photoUrl = path.join('uploads', req.file.filename); //  передаємо відносний шлях в корінь проєкту в папку uploads (на випадок зміни шляху). Папку uploads не вказувати
    }
  }
  // // const body = req.body;
  // // console.log(`body`, body);
  const data = await patchWebFlower(id, photoUrl, { ...req.body });
  // console.log("data", data);

  if (!data) {
    throw createHttpError(404, `Not found`);
  }
  res.json({
    status: 200,
    message: `Successfully patched a flower!`,
    data: data,
  });
};



// 41.5 Попереднє в файлі routers/flowers.js
// 41.7 Наступне в файлі server.js

// 41.9 Попереднє в файлі db/models/flowers.js
// 41.11 Наступне в файлі server.js
