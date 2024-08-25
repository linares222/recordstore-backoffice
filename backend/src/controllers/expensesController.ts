import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prismaInstance = new PrismaClient();

export const getExpensesData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const expenseByProductTypeSummary =
      await prismaInstance.expenseByProductType.findMany({
        orderBy: {
          date: "desc",
        },
      });

    const expenseByProductType = expenseByProductTypeSummary.map((item) => ({
      ...item,
      totalValue: item.totalValue.toString(),
    }));

    res.json(
      expenseByProductType,
    );
  } catch (error) {
    res.status(500).json({ message: "Error returning dashboard data" });
  }
};
