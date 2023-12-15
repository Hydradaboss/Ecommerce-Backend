import { httpSignIn } from "../controllers/auth/signUp.js";
import { httpLogin } from "../controllers/auth/login.js";
import authMiddleware from "../Middleware/isUser.js";
import { httpLogOut } from "../controllers/auth/logOut.js";
import { httpAddUserAddress } from "../controllers/auth/addAddress.js";
import express from "express"
const aRouter = express.Router();

aRouter.post("/register", httpSignIn);
aRouter.post("/login", httpLogin);
aRouter.get("/logout", authMiddleware, httpLogOut);
aRouter.post("/address", authMiddleware, httpAddUserAddress);



export default aRouter;
