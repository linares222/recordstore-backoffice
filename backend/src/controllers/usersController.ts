import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response } from "express";

const prismaInstance = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prismaInstance.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    if (error instanceof PrismaClientKnownRequestError) {
      {
        res.status(500).json({ message: "Error fetching users" });
      }
    } else {
      res.status(501).json({ message: "Unexpected error occurred" });
    }
  }
};
