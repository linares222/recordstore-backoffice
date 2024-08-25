import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dashboardRoutes from "./routes/dashboardRoutes";
import productsRoutes from "./routes/productsRoutes";
import usersRoutes from "./routes/usersRoutes";
import expensesRoutes from "./routes/expensesRoutes";

dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("common"));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use("/dashboard", dashboardRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
app.use("/expenses", expensesRoutes)

const port = process.env.PORT ?? 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
