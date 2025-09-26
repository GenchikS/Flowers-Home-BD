import { ChrysanthemumsCollection, DaisieCollection } from '../db/models/chrysanthemums.js';
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

//  30. Створення сервісу для отримання інформації про весть
export const getAllFlowers = async ({ page, perPage, color, titleSource, size }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const colorSource = color;
  const flowerSize = size;
  // console.log('flowerSize', flowerSize);
  // const titleSourceAll = titleSource;
  // console.log('colorSource', colorSource);
  // console.log('titleSource2', titleSourceAll);

  let Collection;

  switch (titleSource.toLowerCase()) {
    case 'хризантеми':
      Collection = ChrysanthemumsCollection;
      // console.log('Collection1', Collection);
      break;
    case 'ромашки':
      Collection = DaisieCollection;
      // console.log('Collection2', Collection);
      break;
    default:
      Collection = ChrysanthemumsCollection;
    // console.log('Collection3', Collection);
  }

const flowersQuery =
    colorSource === `всі` || !colorSource
      ? Collection.find()
      : Collection.find({
          color: { $eq: colorSource },
      });
  // console.log('flowersQuery', flowersQuery);

const flowersQuerySize =
  flowerSize === `всі` || !flowerSize
    ? flowersQuery.find()
    : flowersQuery.find({
        size: { $eq: flowerSize },
      });

  // console.log('flowersQuerySize', flowersQuery);

  const flowersCount = await Collection.find()
    .merge(flowersQuery)
    .countDocuments();

  // console.log('flowersCount', flowersCount);

  const flowers = await flowersQuerySize.skip(skip).limit(limit).exec();
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
  // console.log('payload', payload.flower);

  let Collection;

    switch (payload.flower.toLowerCase()) {
      case 'хризантема':
        Collection = ChrysanthemumsCollection;
        // console.log('Collection1', Collection);
        break;
      case 'ромашка':
        Collection = DaisieCollection;
        // console.log('Collection2', Collection);
        break;
      default:
        Collection = ChrysanthemumsCollection;
        // console.log('Collection3', Collection);
    }
    const addFlower = Collection.create(payload);
    return addFlower;
};

export const patchFlower = async (id, photoUrl, body) => {
  const padchedFlower = ChrysanthemumsCollection.findOneAndUpdate(
    { _id: id },
    { ...body, photo: photoUrl },
    { new: true },
  );
  return padchedFlower;
};

export const patchWebFlower = async (id, photoWebUrl, body) => {
  const padchedFlower = ChrysanthemumsCollection.findOneAndUpdate(
    { _id: id },
    { ...body, photoWeb: photoWebUrl },
    { new: true },
  );
  return padchedFlower;
};
