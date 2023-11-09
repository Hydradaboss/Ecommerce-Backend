import express from "express"
import { httpLogin, httpSignIn } from "../controllers/authController.js";
const aRouter = express.Router()


aRouter.post("/register", httpSignIn)
aRouter.post("/login", httpLogin);

export default aRouter