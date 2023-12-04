import express from "express";
import {
  httpLogOut,
  httpLogin,
  httpSignIn,
  httpAddUserAddress,
} from "../controllers/auth/user.auth.js";
import {
  httpAdminLogin,
  httpAdminSignIn,
  httpBlockUser,
} from "../controllers/auth/admin.auth.js";
import verifyAdmin from "../Middleware/isAdmin.js";
//import block from "../Middleware/isBlocked.js";
import authMiddleware from "../Middleware/isUser.js";
const aRouter = express.Router();

aRouter.post("/register", httpSignIn);
aRouter.post("/login", httpLogin);
aRouter.get("/logout", authMiddleware, httpLogOut);
aRouter.post("/address", authMiddleware, httpAddUserAddress);
aRouter.post("/admin/register", httpAdminSignIn);
aRouter.post("/admin/login", httpAdminLogin);
aRouter.get("/admin/login", httpAdminLogin);
aRouter.get("/admin/blockuser", verifyAdmin, httpBlockUser);

export default aRouter;
