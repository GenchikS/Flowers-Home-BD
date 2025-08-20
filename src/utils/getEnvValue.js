import dotenv from 'dotenv';
// 21. Ініціалізуємо файли з dotenv (змінні оточення, встановл.ємо npm install dotenv
dotenv.config();

// 22. Створення утилітарної ф-ції для перевірки на наявність порту
export function getEnvValue(name, defaultValue) {
  const value = process.env[name];
  if (value) return value;
  if (defaultValue) return defaultValue;
  // throw new Error(`Missing: process.env[${name}]`);
}

// 20. Попереднє в файлі .env.example
// 23. Наступне в файлі server.js
