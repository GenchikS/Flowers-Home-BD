import { model, Schema } from "mongoose";

//  28. Створення схеми mongoose для flower
const flowerSchema = new Schema(
  {
    flower: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    blossom: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    // 41.9
    photo: {
      type: String,
    },
    photoWeb: {
      type: String,
    },
    availability: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// 29. Створення моделі продукту за допомогою Schema
export const FlowerCollection = model(`chrysanthemums`, flowerSchema);
// export const FlowerCollection = model(`daisies`, flowerSchema);

// 27. Попереднє в файлі index.js
// 30. Наступне в файлі services/flowers.js

// 41.8 Попереднє в файлі utils/saveFileToUploadDir.js
// 41.10 Наступне в файлі controllers/flowers.js
