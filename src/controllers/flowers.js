import { errorHandler } from "../middlwares/errorHandler.js";
import { createFlower, getAllFlowers } from "../services/flowers.js";

// 38. Створення контролеру getFlowersController
export const getFlowersController = async(req, res) => {
try {
  const flowersAllProducts = await getAllFlowers();
    // console.log(`flowersProducts`, flowersAllProducts);
    res.status(200).json({
      data: flowersAllProducts,
    });
} catch (error) {
  errorHandler;
}
};

// 36. Попереднє в файлі routers/flowers.js
// 39. Наступне в файлі controllers/flowers.js

export const createFlowerController = async (req, res) => {
  const addFlower = await createFlower(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a flower!',
    data: addFlower
  });
};
