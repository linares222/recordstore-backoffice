import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
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
    console.log(req.body);
    const { name, price, stock, productType, barcode } = req.body;
    const product = await prismaInstance.product.create({
      data: {
        name,
        price,
        stock,
        productType,
        barcode,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    if (error instanceof PrismaClientKnownRequestError) {
      {
        res.status(500).json({ message: "Error creating product" });
      }
    } else {
      res.status(500).json({ message: "Unexpected error occurred" });
    }
  }
};
