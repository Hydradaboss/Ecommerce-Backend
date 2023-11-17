import { SignIn, login } from "../models/userAuthModel.js";

export const httpAdminSignIn = async (req, res) => {
  const { refreshToken, accessToken } = await SignIn(req.body);
  res.cookie(accessToken, refreshToken, {
    httpOnly: true,
    maxAge: 24 * 24 * 1000 * 60,
    secure: true,
  });
  res.status(201).send({ msg: "Signed Up" });
};

export const httpAdminLogin = async (req, res) => {
  const { refreshToken, accessToken } = await login(req.body);
  res.cookie(accessToken, refreshToken, {
    httpOnly: true,
    maxAge: 24 * 24 * 1000 * 60,
    secure: true,
  });
  res.status(200).send({ msg: "Logged In" });
};
