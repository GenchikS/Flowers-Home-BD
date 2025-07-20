import { getAllFlowers } from "../services/flowers.js";

// 38. Створення контролеру getFlowersController
export const getFlowersController = async(req, res) => {
try {
  const flowersAllProducts = await getAllFlowers();
    // console.log(`flowersProducts`, flowersAllProducts);
    res.status(200).json({
      message: 'Successfull find flowers',
      flowersAllProducts,
    });
} catch (error) {
    res.stasus(500).json({
    status: 500,
    message: 'Something went wrong',
    error: error.message,
});
}
};

// 36. Попереднє в файлі routers/flowers.js
// 39. Наступне в файлі controllers/flowers.js
