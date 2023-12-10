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
import pkg from "pg"
const {Pool} = pkg
const store = pgStore(session);
const pool = new Pool({
  user: process.env.PGU,
  host: process.env.PGHOST,
  database: process.env.PGDB,
  password: process.env.PGPASS,
  port: process.env.PGPORT,
});

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(cookie());
app.use(
  session({
    store: new store({
      pool,
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true,
      tableName: "EC_Session",
    }),
    secret: process.env.SS,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(express.json());
app.use("/", aRouter);
app.use("/", pRouter);
app.use(notFound);
app.use(error);

export default app;
