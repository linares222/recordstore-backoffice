import { Router } from "express";

import { getProducts, addProduct } from "../controllers/productsController";

const router = Router();

router.get("/", getProducts);

router.post("/", addProduct);

export default router;