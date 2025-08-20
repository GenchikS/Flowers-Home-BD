import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
import { getEnvValue } from './getEnvValue.js';


// 41.8
// export const saveFileToUploadDir = async (file) => {
//   const newPath = path.join(UPLOAD_DIR, file.filename);
//   await fs.rename(file.path, newPath);
// };
export const saveFileToUploadDir = async (file) => {
  await fs.rename(
    path.join(TEMP_UPLOAD_DIR, file.filename),
    path.join(UPLOAD_DIR, file.filename),
  );

  return `${getEnvValue('APP_DOMAIN')}/uploads/${file.filename}`;
};

// 41.7 Попереднє в файлі server.js
// 41.9 Наступне в файлі db/models/flowers.js
