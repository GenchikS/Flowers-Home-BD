import { flowerCollection } from "../db/models/flower.js";

//  30. Створення сервісу для отримання інформації про весть список товарів
export const getAllFlowers = () => flowerCollection.find();

// 29. Попереднє в файлі models/flower.js (модель схеми flower)
// 31. Наступне в файлі server.js

