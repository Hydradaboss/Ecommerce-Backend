import { SignIn, Login } from "../models/userAuthModel.js";

export const httpSignIn = async (req, res) => {
  const { refreshToken, accessToken } = await SignIn(req.body);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 24 * 1000 * 60,
    secure: true,
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 24 * 24 * 1000 * 60,
    secure: true,
  });
  res.status(201).send({ msg: "Signed Up" });
};

export const httpLogin = async (req, res) => {
  const { refreshToken, accessToken } = await Login(req.body);
 res.cookie("refreshToken", refreshToken, {
   httpOnly: true,
   maxAge: 24 * 24 * 1000 * 60,
   secure: true,
 });
 res.cookie("accessToken", accessToken, {
   httpOnly: true,
   maxAge: 24 * 24 * 1000 * 60,
   secure: true,
 });
  res.status(200).send({ msg: "Logged In" });
};
