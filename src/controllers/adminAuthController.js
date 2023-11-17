import { adminLogin, adminSignIn } from "../models/adminAuthModel.js";

export const httpAdminSignIn = async (req, res) => {
  const { refreshToken, accessToken } = await adminSignIn(req.body);
  res.cookie(accessToken, refreshToken, {
    httpOnly: true,
    maxAge: 24 * 24 * 1000 * 60,
    secure: true,
  });
  res.status(201).send({ msg: "Signed Up" });
};

export const httpAdminLogin = async (req, res) => {
 const { refreshToken, accessToken } = await adminLogin(req.body);
 res.cookie(accessToken, refreshToken, {
   httpOnly: true,
   maxAge: 24 * 24 * 1000 * 60,
   secure: true,
 });
 res.status(200).send({ msg: "Logged In" });
};
