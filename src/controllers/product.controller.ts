import { Request, Response, NextFunction } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../services/product.service";

const Delete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await deleteProduct(id);
    res.json({
      success: true,
      message: "Product deleted successfully",
      ProductId: id,
    });
  } catch (err) {
    next(err);
  }
};

const GetAll = async (req: Request, res: Response, next: NextFunction) => {
  const name = req.query.name as string;
  const category = req.query.category as string;
  try {
    const products = await getAllProducts(req.businessId ?? "", name, category);
    res.json({
      success: true,
      products: products,
    });
  } catch (err) {
    next(err);
  }
};

const Update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedProduct = await updateProduct(id, req.body);

    res.json({
      success: true,
      message: "Product updated successfully.",
      Product: {
        updatedProduct,
      },
    });
  } catch (err) {
    next(err);
  }
};

const Add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProduct = await addProduct(req.body);

    res.status(201).json({
      success: true,
      message: "Product added successfully.",
      id: newProduct._id,
      name: newProduct.name,
    });
  } catch (err) {
    next(err);
  }
};

export { Add, Update, Delete, GetAll };
