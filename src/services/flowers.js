import { FlowerCollection } from "../db/models/flower.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

//  30. Створення сервісу для отримання інформації про весть список товарів
export const getAllFlowers = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const flowersQuery = FlowerCollection.find();
  const flowersCount = await FlowerCollection.find().merge(flowersQuery).countDocuments();

  const flowers = await flowersQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(flowersCount, page, perPage);

  return {
    data: flowers,
    ...paginationData,
  };
};

// 29. Попереднє в файлі models/flower.js (модель схеми flower)
// 31. Наступне в файлі server.js

export const createFlower = async (payload) => {
    const addFlower = FlowerCollection.create(payload);
    return addFlower;
};

export const patchFlower = async (id, photoUrl, body) => {
  const padchedFlower = FlowerCollection.findOneAndUpdate(
    { _id: id },
    { ...body, photo: photoUrl },
    { new: true },
  );
  return padchedFlower;
};

