import { Login } from "../../models/auth/login.model.js";
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
