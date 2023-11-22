import { SignIn, Login, logOut } from "../models/userAuthModel.js";
import { addUserAddress } from "../models/userAuthModel.js";

export const httpSignIn = async (req, res) => {
  try {
    const { refreshToken, accessToken, userid } = await SignIn(req.body);
    console.log(req.sessionID);
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
    res.cookie("sessionID", req.sessionID, {
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
    const { refreshToken, accessToken, userid } = await Login(req.body);
    req.session.userid = userid;
    console.log(req.session.userid);
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
    console.log(req.sessionID);
    await logOut(parseInt(userid));
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    await req.session.destroy();
    res.status(200).send({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Log out Failed" });
  }
};
export const httpAddUserAddress = async (req, res) => {
  const payload = await addUserAddress(req.body, parseInt(req.query.id));
  res.status(201).json({ done: "done" });
};
