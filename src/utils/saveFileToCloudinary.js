import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'node:fs/promises';
import { getEnvValue } from './getEnvValue.js';

//  витягнули змінні оточення
const cloud_name = getEnvValue('CLOUDINARY_CLOUD_NAME');
const api_key = getEnvValue('CLOUDINARY_API_KEY');
const api_secret = getEnvValue('CLOUDINARY_API_SECRET');

// вставляємо в налаштування пакету cloudnary
cloudinary.config({
  secure: true,
  cloud_name,
  api_key,
  api_secret,
});

export const saveFileToCloudinary = async (file, folder) => {
  // console.log('file', file);
  // console.log('folder', folder);

  try {
  const response = await cloudinary.uploader.upload(file.path, { folder }); // завантаження файлів в cloudnary
  // console.log('response', response.url);  //  інформація про завантажений файл
    return response.url;
  }
  catch(error) {
    // throw error;
  }
  finally {
    await unlink(file.path); // видалення файлу temp
  }
};
