import { AppError } from "../errors/app.error";
import { Product } from "../models/product.model";
import { filterUpdateBody } from "../utils/filterUpdateBody";
import { addProductDto } from "../zod/add-product.schema";
import { updateProductDto } from "../zod/update-product.schema";

const deleteProduct = async (productId: string) => {
  const product = await Product.findByIdAndDelete(productId);
  if (!product) {
    throw new AppError(`No product with id : ${productId} found.`, 404);
  }

  return product;
};

const updateProduct = async (
  productId: string,
  updateProductDto: updateProductDto,
) => {
  const filteredDto = filterUpdateBody(updateProductDto);
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      $set: filteredDto,
    },
    {
      new: true, // to get updated model after update operation
    },
  ).select({
    _id: 1,
    name: 1,
    category: 1,
    description: 1,
    price: 1,
    businessId: 1,
    stock: 1,
  });

  if (!updatedProduct) {
    throw new AppError(`No product with id : ${productId} found.`, 404);
  }

  return updatedProduct;
};

const addProduct = async (addProductDto: addProductDto) => {
  const existingProduct = await Product.findOne({
    name: addProductDto.name,
  });

  if (existingProduct) {
    throw new AppError("Product with this name already exists.", 409);
  }

  const newProduct = await Product.create({
    price: addProductDto.price,
    name: addProductDto.name,
    businessId: addProductDto.businessId,
    description: addProductDto.description,
    catetory: addProductDto.category,
  });

  return newProduct;
};

const getAllProducts = async (
  businessId: string,
  name: string,
  category: string,
) => {
  const products = await Product.find({
    businessId: businessId,
    name: { $regex: name, $options: "i" },
    catetory: { $regex: category, $options: "i" },
  })
    .select({
      _id: 1,
      name: 1,
      description: 1,
      catetory: 1,
      price: 1,
      businessId: 1,
      stock: 1,
    })
    .exec();

  return products;
};
export { updateProduct, deleteProduct, getAllProducts, addProduct };
