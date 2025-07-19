import mongoose from 'mongoose';
import { getEnvValue } from '../utils/getEnvValue.js';

// 25. Інсталюємо пакет npm install mongoose
// 26. Створюємо ф-цію підключення до BD та використовуємо env змінні
export const initMongoDB = async () => {
  try {
    const user = getEnvValue(`MONGODB_USER`);
    const pwd = getEnvValue(`MONGODB_PASSWORD`);
    const url = getEnvValue(`MONGODB_URL`);
    const db = getEnvValue(`MONGODB_DB`);
    //  Викликаємо метод connect з бібліотеки mongoose
    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log(`Mongo connection successfully established!`);
  } catch (e) {
    console.log(`Error while setting up mongo conection`, e);
    throw e;
  }
};


// 27. Наступне в файлі index.js
