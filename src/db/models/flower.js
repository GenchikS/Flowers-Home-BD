import { model, Schema } from "mongoose";

//  28. Створення схеми mongoose для flower
const flowerSchema = new Schema(
  {
    flower: {
      type: String,
      required: true,
    },
    size: {
      type: String,
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
    photo: {
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
export const flowerCollection = model(`flower`, flowerSchema);

// 27. Попереднє в файлі index.js
// 30. Наступне в файлі services/flowers.js
