import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvValue } from './utils/getEnvValue.js';
import flowersRouters from './routers/flowers.js';
// import { notFoundHandler } from './middlwares/notFoundHandler.js';
import { errorHandler } from './middlwares/errorHandler.js';
import { notFoundHandler } from './middlwares/notFoundHandler.js';
// import { getAllFlowers } from './services/flowers.js';

// 10. Створюємо ф-цію startServer, повідомлення PORT та get-запит
  //  9. Створюємо змінну PORT
  // const PORT = 3000;

  // 23. Використання ф-ції getEnvValue для отримання значення PORT
  const PORT = Number(getEnvValue(`PORT`, `3000`));
// console.log("PORT", PORT);

export const startServer = () => {
  const app = express();

  // 12. Вбудована мідлвара для обробки парсингу JSON данних
  app.use(express.json());

  // 15 Додавання мідлвари CORS. Перевірка та доступи з різних перехресних доменів. Встановлення npm i cors

  app.use(cors());

  // 16. Створення структури папок в папці src(contacts, controllers, db, midlwares, routes, services, templates, utils, validation, .env(в корнефому файлі!!!) , .env.example(в корнефому файлі!!!))

  // 14. Мідлвара логування pino. Встановлення npm install pino-http та npm i --save-dev pino-pretty
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  //  36. Видаляємо звичайний запит та створюємо роут для маршруту /flowers
    // app.use(`/flowers`, async (req, res) => {
    //   const flowersProducts = await getAllFlowers();
    //   console.log(`flowersProducts`, flowersProducts);
    //   res.status(200).json({
    //     data: flowersProducts,
    //   });
    // });
  app.use(flowersRouters);

  // 13.  Створюємо мідлвари помилок
  // 32. Змінюємо обробку помилок на пакет http-errors (npm install http-errors)
  // app.use((req, res, next) => {
  //   res.status(404).json({
  //     message: 'Route not found',
  //   });
  // });
  app.use(notFoundHandler);


  // app.use((err, req, res, next) => {
  //   res.status(500).json({
  //     message: 'Something went wrong',
  //     error: err.message,
  //   });
  // });

  // 34. Змінюємо обробку помилоки 500
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Started PORT ${PORT}`);
  });
};


//  8. Попереднє в файлі index.js
//  11. Наступне в файлі index.js

//  11. Попереднє в файлі index.js
//  17. Наступне в файлі .env

//  22. Попереднє в файлі utils/getEnvValue.js
//  24. Наступне в файлі .env

//  30. Попереднє в файлі services/flowers.js
//  33. Наступне в файлі middlwares/notFoundHandler.js

//  33. Попереднє в файлі middlwares/notFoundHandler.js
//  35. Наступне в файлі middlwares/errorHandler.js



//  35. Попереднє в файлі middlwares/errorHandler.js
//  37. Наступне в файлі routers/flowers.js

//  39. Створення на frontend redux та діставання масиву
//  40. Створення POST маршруту (додавання до BD) server.js





//  40. Додовання фото до BD (npm i multer)
