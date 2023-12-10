import { SignIn, Login, logOut } from "../../models/auth/user.auth.js";
import { addUserAddress } from "../../models/auth/user.auth.js";
import { stripBody } from "../../utils/helper.js";

export const httpSignIn = async (req, res) => {
  try {
    const { email, firstName, lastName, mobile, password } = stripBody(
      req.body
    );
    const { refreshToken, accessToken } = await SignIn(
      email,
      firstName,
      mobile,
      lastName,
      password
    );
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
    console.log(req.sessionID)
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
    await logOut(req.user.email);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.clearCookie("connect.sid");
    req.session.destroy();
    res.status(200).send({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Log out Failed" });
  }
};
export const httpAddUserAddress = async (req, res) => {
  await addUserAddress(req.body, parseInt(req.query.id));
  res.status(201).json({ done: "done" });
};
