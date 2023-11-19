import {
  adminLogin,
  adminSignIn,
  blockUser,
  unBlockUser,
} from "../models/adminAuthModel.js";

export const httpAdminSignIn = async (req, res) => {
  const { refreshToken, accessToken } = await adminSignIn(req.body);
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

export const httpAdminLogin = async (req, res) => {
  const { refreshToken, accessToken } = await adminLogin(req.body);
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

export const httpBlockUser = async (req, res) => {
  const user = await blockUser(req.user.id);
  res.status(200).send("user blocked");
};

export const httpUnBlockUser = async (req, res) => {
  const user = await unBlockUser(req.user.id);
  res.status(200).send("user unBlocked");
};
