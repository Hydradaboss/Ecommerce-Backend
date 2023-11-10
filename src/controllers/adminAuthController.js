import { adminLogin,adminSignIn } from "../models/adminAuthModel.js";

export const httpAdminSignIn = async (req, res) => {
  const body = req.body;
  const createdToken = await adminSignIn(body);
  res.status(201).send(createdToken);
};

export const httpAdminLogin = async (req, res) => {
  const { email, password } = req.body;
  const {data, refreshToken} = await adminLogin(email, password);
  res.cookie("refreshToken",refreshToken,{
    httpOnly:true,
    maxAge: 24 * 24 * 1000 * 60
  })
  res.status(200).send(data);
};
