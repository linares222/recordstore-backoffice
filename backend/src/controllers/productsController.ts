import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prismaInstance = new PrismaClient();

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const products = await prismaInstance.product.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      orderBy: {
        id: "asc",
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error returning products" });
  }
};

export const addProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, name, price, stock, productType, barcode } = req.body;
    const product = prismaInstance.product.create({
      data: {
        id,
        name,
        price,
        stock,
        productType,
        barcode,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};
