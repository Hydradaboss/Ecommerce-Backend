import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const SignIn = async (body) => {
  try {
    const email = body.email;
    const finduser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (finduser) {
      throw new Error(" User already exists");
    }

    const password = body.password;
    const hashedPass = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        mobile: body.mobile,
        password: hashedPass,
      },
    });

    const accessToken = await createAccessToken({
      email: user.email,
      role: user.role,
      password: user.password,
    });

    const refreshToken = await createRefreshToken({
      email: user.email,
      userid: user.id,
    });

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: refreshToken,
      },
    });
    return { refreshToken, accessToken };
  } catch (error) {
    console.log(error);
  }
};
export const Login = async (body) => {
  try {
    const User = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!User) {
      throw new Error("No user with this email found");
    }
    const savedPass = User.password;
    const result = await bcrypt.compare(body.password, savedPass);
    if (!result) {
      throw new Error("Password Incorrect");
    }
    const accessToken = await createAccessToken({
      email: User.email,
      role: User.role,
      password: User.password,
    });

    const refreshToken = await createRefreshToken({
      email: User.email,
      userid: User.id,
    });
    await prisma.user.update({
      where: {
        id: User.id,
      },
      data: {
        refreshToken: refreshToken,
      },
    });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
  }
};
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
const createAccessToken = async (payload) => {
  const token = jwt.sign({ payload }, process.env.ATS, {
    expiresIn: "1h",
  });
  return token;
};
const createRefreshToken = async (payload) => {
  const token = jwt.sign({ payload }, process.env.RTS, {
    expiresIn: "30d",
  });
  return token;
};
