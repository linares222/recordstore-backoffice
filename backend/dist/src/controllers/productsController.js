"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = exports.getProducts = void 0;
const client_1 = require("@prisma/client");
const prismaInstance = new client_1.PrismaClient();
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const search = (_a = req.query.search) === null || _a === void 0 ? void 0 : _a.toString();
        const products = yield prismaInstance.product.findMany({
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
    }
    catch (error) {
        res.status(500).json({ message: "Error returning products" });
    }
});
exports.getProducts = getProducts;
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (error) {
        res.status(500).json({ message: "Error creating product" });
    }
});
exports.addProduct = addProduct;
