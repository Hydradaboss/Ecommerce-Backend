import { logOut } from "../../models/auth/logOut.model.js";
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
