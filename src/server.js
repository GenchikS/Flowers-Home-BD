import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvValue } from './utils/getEnvValue.js';
import { getAllFlowers } from './services/flowers.js';

//  9. Створюємо змінну PORT
// const PORT = 3000;

// 23. Використання ф-ції getEnvValue для отримання значення PORT
const PORT = Number(getEnvValue(`PORT`, `3000`, `5173`));
// console.log("PORT", PORT);

// 10. Створюємо ф-цію startServer, повідомлення PORT та get-запит
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

  app.get(`/`, (req, res) => {
    res.json({ massage: 'Get Home' });
  });

  app.get(`/flowers`, async (req, res) => {
    const flowersProducts = await getAllFlowers();
    console.log(`flowersProducts`, flowersProducts);
    res.status(200).json({
      data: flowersProducts,
    });
   });

  // 13.  Створюємо мідлвари помилок
  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Route not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

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
//  . Наступне в файлі .env
