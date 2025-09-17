import { FlowerCollection } from "../db/models/flower.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

//  30. Створення сервісу для отримання інформації про весть список товарів
export const getAllFlowers = async ({ page, perPage, color }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const colorSource = color;
  // console.log('colorSource', colorSource);

  const flowersQuery =
    colorSource === `всі` || !colorSource
      ? FlowerCollection.find()
      : FlowerCollection.find({
        color: { $eq: colorSource },
       });

  // console.log('flowersQuery', flowersQuery);
  const flowersCount = await FlowerCollection.find().merge(flowersQuery).countDocuments();

  const flowers = await flowersQuery.skip(skip).limit(limit).exec();

  // console.log('flowers', flowers);

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

export const patchWebFlower = async (id, photoWebUrl, body) => {
  const padchedFlower = FlowerCollection.findOneAndUpdate(
    { _id: id },
    { ...body, photoWeb: photoWebUrl },
    { new: true },
  );
  return padchedFlower;
};
