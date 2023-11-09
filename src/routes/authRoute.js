import express from "express"
import { httpLogin, httpSignIn } from "../controllers/userAuthController.js";
import { httpAdminLogin, httpAdminSignIn } from "../controllers/adminAuthController.js";
const aRouter = express.Router()


aRouter.post("/register", httpSignIn)
aRouter.post("/login", httpLogin);
aRouter.post("/admin/register", httpAdminSignIn);
aRouter.post("/admin/login", httpAdminLogin );
export default aRouter