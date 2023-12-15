import express from "express";
import authmiddleware from "../Middleware/isUser.js";
import verifyAdmin from "../Middleware/isAdmin.js";
import {
  httpCreateProduct,
} from "../controllers/product/createProducts.js";
import {
  addToProdcutToWishlist,
  addToProductCart,
  getUserCart,
  getUserWishlist,
  removeProdcutfromCart,
  removeProdcutfromWishlist,
} from "../controllers/product/user.product.js";
const pRouter = express.Router();

pRouter.post("/admin/create", authmiddleware, verifyAdmin, httpCreateProduct);
pRouter.get("/admin/get", authmiddleware, verifyAdmin);
pRouter.put("/admin/update", authmiddleware, verifyAdmin);
pRouter.delete("/admin/delete", authmiddleware, verifyAdmin);
pRouter.post("/:prodid/wishlist", addToProdcutToWishlist);
pRouter.post("/:prodid/cart", addToProductCart);
pRouter.get("/get/cart", getUserCart);
pRouter.get("/get/wishlist", getUserWishlist);
pRouter.delete("/del/cart", removeProdcutfromCart);
pRouter.delete("/del/wishlist", removeProdcutfromWishlist);
export default pRouter;
