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
exports.getExpensesData = void 0;
const client_1 = require("@prisma/client");
const prismaInstance = new client_1.PrismaClient();
const getExpensesData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenseByProductTypeSummary = yield prismaInstance.expenseByProductType.findMany({
            orderBy: {
                date: "desc",
            },
        });
        const expenseByProductType = expenseByProductTypeSummary.map((item) => (Object.assign(Object.assign({}, item), { amount: item.totalValue.toString() })));
        res.json({
            expenseByProductType,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error returning dashboard data" });
    }
});
exports.getExpensesData = getExpensesData;
