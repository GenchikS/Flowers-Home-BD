import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';


// 42.2
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
    //  destination: TEMP_UPLOAD_DIR,
  },
 filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

export const upload = multer({ storage });

// 41.1 Попереднє в файлі constants.index.js
// 41.3 Наступне в файлі utils/createDirIfNotExist.js
