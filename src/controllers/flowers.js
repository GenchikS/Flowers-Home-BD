import { errorHandler } from "../middlwares/errorHandler.js";
import {
  createFlower,
  patchFlower,
  getAllFlowers,
  patchWebFlower,
  deleteFlower,
  findByIdFlower,
} from '../services/flowers.js';
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvValue } from "../utils/getEnvValue.js";
import createHttpError from "http-errors";
import { deleteFileToCloudinary } from "../utils/deleteFileToCloudinary.js";


const enableCloudnary = getEnvValue('ENABLE_CLOUDNARY');

// 38. Створення контролеру getFlowersController
export const getFlowersController = async (req, res) => {
  // const { page, perPage, color, titleSource } = parsePaginationParams(
  //   req.query,
  // );
  // console.log('flower', req.query);
try {
  const flowersAllProducts = await getAllFlowers(req.query);
  // console.log(`flowersAllProducts`, flowersAllProducts);
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
      photoUrl = await saveFileToUploadDir(photo); //  якщо приходить файл, то передаємо для переміщення
      // photoUrl = path.join('uploads', req.file.filename); //  передаємо відносний шлях в корінь проєкту в папку uploads (на випадок зміни шляху). Папку uploads не вказувати
    }
}

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


export const patchFlowerWebController = async (req, res, next) => {
  const { id } = req.params;
  const photoWeb = req.file;
  // console.log(`photoWeb`, photoWeb);

  let photoUrl = null; //  пуста

  if (photoWeb) {
    // console.log(`req.file`, req.file);
    if (enableCloudnary === 'true') {
      //    // console.log(`enableCloudnary`, enableCloudnary);
      photoUrl = await saveFileToCloudinary(photoWeb, 'flowershome/photoWeb');
      // console.log("photoUrl", photoUrl);
    } else {
      // console.log('photo else', photo);
      photoUrl = await saveFileToUploadDir(photoWeb); //  якщо приходить файл, то передаємо для переміщення
      // photoUrl = path.join('uploads', req.file.filename); //  передаємо відносний шлях в корінь проєкту в папку uploads (на випадок зміни шляху). Папку uploads не вказувати
    }
  }

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


// ф-ція витягування public_id зі шляху в cloudinary

function getPublicId(url) {
  const parts = url.split('/upload/')[1];
  const withoutVersion = parts.replace(/^v\d+\//, '');
  return withoutVersion.substring(0, withoutVersion.lastIndexOf('.'));
}


export const deleteFlowerWebController = async (req, res, next) => {

  const flower = await findByIdFlower(req.query);
  // console.log('flower', flower);

  const public_id_photo = getPublicId(flower.photo);
  // console.log('public_id_photo', public_id_photo);

  const public_id_photoWeb = getPublicId(flower.photoWeb);
  // console.log('public_id_photoWeb', public_id_photoWeb);


  const deleteCloudinary = await deleteFileToCloudinary(
    public_id_photo,
    public_id_photoWeb,
  );
  // console.log('deleteCloudinary', deleteCloudinary);

  const data = await deleteFlower(req.query);
  // console.log('data', data);
  res.json({
      status: 200,
      message: `${deleteCloudinary.isPhoto}! ${deleteCloudinary.isPhotoWeb}!`,
      data: data
    });
};

