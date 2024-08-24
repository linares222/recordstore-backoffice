"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expensesController_1 = require("../controllers/expensesController");
const router = (0, express_1.Router)();
router.get("/", expensesController_1.getExpensesData);
exports.default = router;
