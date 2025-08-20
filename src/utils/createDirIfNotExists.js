import fs from 'node:fs/promises';

// 43.3
export const createDirIfNotExists = async (url) => {
  try {
    await fs.access(url);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(url);
    }
  }
};


// 41.2 Попереднє в файлі middlewares/multer.js
// 41.4 Наступне в файлі index.js
