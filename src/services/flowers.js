import { FlowerCollection } from "../db/models/flower.js";

//  30. Створення сервісу для отримання інформації про весть список товарів
export const getAllFlowers = () => FlowerCollection.find();

// 29. Попереднє в файлі models/flower.js (модель схеми flower)
// 31. Наступне в файлі server.js

export const createFlower = async (payload) => {
    const addFlower = FlowerCollection.create(payload);
    return addFlower;
};
