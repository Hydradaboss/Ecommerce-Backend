import {
  adminLogin,
  adminSignIn,
  blockUser,
  unBlockUser,
} from "../models/adminAuthModel.js";

export const httpAdminSignIn = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const httpAdminLogin = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const httpBlockUser = async (req, res) => {
  try {
    const user = await blockUser(req.user.userid);
    res.status(200).send("User blocked");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const httpUnBlockUser = async (req, res) => {
  try {
    await unBlockUser(req.user.userid);
    res.status(200).send("User unblocked");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
