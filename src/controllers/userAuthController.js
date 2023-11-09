import { SignIn, login } from "../models/userAuthModel.js";


export const httpSignIn = async (req, res) => {
    const body = req.body
    const createdToken  = await SignIn(body)
    res.status(201).send(createdToken)
};

export const httpLogin = async (req, res) => {
    const {email , password} = req.body 
    const data = await login(email, password)
    res.status(200).send(data)
};
