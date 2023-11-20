import { SignIn, Login, logOut } from "../models/userAuthModel.js";

export const httpSignIn = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Sign in failed" });
  }
};

export const httpLogin = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: " Login failed" });
  }
};

export const httpLogOut = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    await logOut(req.user.userid);
    res.status(200).send({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Log out Failed" });
  }
};
