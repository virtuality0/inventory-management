import { Product } from "../models/product.model";

const getInventory = async (businessId: string) => {
  const inventory = await Product.find({}).select({
    name: 1,
    price: 1,
    stock: 1,
  });

  return inventory;
};

export { getInventory };
