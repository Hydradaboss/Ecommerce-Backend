import express from "express";
import authmiddleware from "../Middleware/isUser.js";
import verifyAdmin from "../Middleware/isAdmin.js";
import {
  httpGetAllProduct,
  httpCreateProduct,
  httpUpdateProduct,
  httpDeleteProduct,
} from "../controllers/productController.js";
const pRouter = express.Router();

pRouter.post("/create", authmiddleware, httpCreateProduct);
pRouter.get("/get", authmiddleware,verifyAdmin, httpGetAllProduct);
pRouter.put("/update", authmiddleware,verifyAdmin, httpUpdateProduct);
pRouter.delete("/delete", authmiddleware, verifyAdmin,httpDeleteProduct);
export default pRouter;
