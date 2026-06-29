import { v2 as cloudinary } from 'cloudinary';
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

export const deleteFileToCloudinary = async (public_id_photo, public_id_photoWeb) => {
  // console.log('public_id_photo', public_id_photo);
  // console.log('public_id_photoWeb', public_id_photoWeb );
  let isPhoto;
  let isPhotoWeb;
  try {

    const responsePhoto = await cloudinary.uploader.destroy(public_id_photo); // завантаження файлів в cloudnary
    // console.log('responsePhoto', responsePhoto);
    if (responsePhoto.result == 'ok') {
      isPhoto = 'Photo видалено';
    } else {
      isPhoto = 'Помилка видалення photo';
    }
    // console.log('isPhoto', isPhoto);

   const responsePhotoWeb =
     await cloudinary.uploader.destroy(public_id_photoWeb);
    if (responsePhotoWeb.result == 'ok') {
      isPhotoWeb = 'PhotoWeb видалено';
    } else {
      isPhotoWeb = 'Помилка видалення photoWeb';
    }
    // console.log('isPhotoWeb', isPhotoWeb.result);

  } catch (error) {
    // throw error;
  }
  return {isPhoto, isPhotoWeb};
};
