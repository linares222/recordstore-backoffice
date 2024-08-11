import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prismaInstance = new PrismaClient();

export const getDashboardData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const popularProducts = await prismaInstance.product.findMany({
      take: 5,
      orderBy: {
        stock: "desc",
      },
    });
    const orderSummary = await prismaInstance.orderSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const purchaseSummary = await prismaInstance.purchaseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const expenseSummary = await prismaInstance.expenseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const expenseByProductTypeSummary =
      await prismaInstance.expenseByProductType.findMany({
        take: 5,
        orderBy: {
          date: "desc",
        },
      });
      
    const expenseByProductType = expenseByProductTypeSummary.map((item) => ({
      ...item,
      amount: item.totalValue.toString(),
    }));
    
    res.json({
        popularProducts,
        orderSummary,
        purchaseSummary,
        expenseSummary,
        expenseByProductType,
    })
  } catch (error) {
    res.status(500).json({ message: "Error returning dashboard data" });
  }
};
