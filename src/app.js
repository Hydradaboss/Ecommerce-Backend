import aRouter from "./routes/authRoute.js";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import pRouter from "./routes/productRoute.js";

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use("/auth", aRouter);
app.use("/", pRouter);

export default app;
