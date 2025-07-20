import { getAllFlowers } from "../services/flowers.js";

export const getFlowersController = async(req, res) => {
try {
  const flowersAllProducts = await getAllFlowers();
    console.log(`flowersProducts`, flowersAllProducts);
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
