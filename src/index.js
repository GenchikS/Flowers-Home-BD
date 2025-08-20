// 1. Встановлюємо npm init -y
// 2. Встановлюємо npm install --save-dev nodemon
// 3. Додаємо в package.json
// "scripts": {
    // "dev": "nodemon src/index.js"
// }
// 4. Встановлюємо npm init @eslint/config@latest
// 5. Створюємо файл .editorconfig
// 6. Створюємо файл .prettierrc
// 7. Створюємо файл .gitignore
// 8. Встановлюємо npm install express

// Тест
//  const home = "Hello"
// console.log(home);


import { initMongoDB } from "./db/initMongoDB.js";
import { startServer } from "./server.js";
import { createDirIfNotExists } from "./utils/createDirIfNotExists.js";
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';

// const home = "Hello Flowers";
// console.log(home);

//  11. Запускаємо сервер та перевіряємо через Postman
// startServer();

// 27. Замість пункту 11, створюємо ф-цію запуску серверу з підключенням до бази
const bootstrap = async () => {
    await initMongoDB();
    // 41.4 Додаємо папки тимчасового збереження фото
      await createDirIfNotExists(TEMP_UPLOAD_DIR);
      await createDirIfNotExists(UPLOAD_DIR);
    startServer();
};

bootstrap();

// 9. Наступне в файлі server.js

// 10. Попереднїє в файлі server.js
// 12. Наступне в файлі server.js

// 26. Попереднїє в файлі db/initMongoDB.js
// 28. Наступне в файлі db/models/flower.js

// 41.3 Попереднїє в файлі utils/createDirIfNotExist.js
// 41.5 Наступне в файлі routers/flowers.js
