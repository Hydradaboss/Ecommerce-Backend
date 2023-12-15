import { SignIn } from "../../models/auth/signUp.model.js";
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
