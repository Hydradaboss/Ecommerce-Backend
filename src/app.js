import aRouter from "./routes/authRoute.js";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookie from "cookie-parser";
import session from "express-session";
import pRouter from "./routes/productRoute.js";
import notFound from "./Middleware/notFound.js";
import error from "./Middleware/error.js";
import pgStore from "connect-pg-simple";
const store = pgStore(session);

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(cookie());
app.use(
  session({
    store: new store({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true,
      tableName: "EC Session",
    }),
    secret: process.env.SS,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(express.json());
app.use("/", aRouter);
app.use("/", pRouter);
app.use(notFound);
app.use(error);

export default app;
