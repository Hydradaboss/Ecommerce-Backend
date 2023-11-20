import express from "express"
import {httpLogOut, httpLogin, httpSignIn } from "../controllers/userAuthController.js";
import { httpAdminLogin, httpAdminSignIn, httpBlockUser } from "../controllers/adminAuthController.js";
import verifyAdmin from "../Middleware/isAdmin.js";
import block from "../Middleware/isBlocked.js";
import authMiddleware from "../Middleware/isUser.js";
const aRouter = express.Router()

aRouter.post("/register", httpSignIn)
aRouter.post("/login", block, httpLogin);
aRouter.get("/logout",authMiddleware, httpLogOut);
aRouter.post("/admin/register", httpAdminSignIn);
aRouter.post("/admin/login", httpAdminLogin );
aRouter.get("/admin/login", httpAdminLogin);
aRouter.get("/admin/blockuser",verifyAdmin, httpBlockUser);

export default aRouter