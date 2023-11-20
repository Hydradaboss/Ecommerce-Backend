import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const prisma = new PrismaClient();

export const adminSignIn = async (body) => {
  try {
    const email = body.email;
    const isValidEmail = validator.isEmail(email);
    if (!isValidEmail) {
      throw new Error("Email is not valid");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const password = body.password;
    const hashedPass = await hashPassword(password);

    const newMobile = parseInt(body.mobile, 10);
    if (isNaN(newMobile)) {
      throw new Error("Number is NaN");
    }

    const user = await prisma.user.create({
      data: {
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        mobile: newMobile,
        password: hashedPass,
        role: "admin",
      },
    });

    const accessToken = await createAccessToken({
      email: user.email,
      role: user.role,
      password: user.password,
      userid: user.id,
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
    console.error(error);
    throw error;
  }
};

export const adminLogin = async (body) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        role: "admin",
      },
    });

    if (!user) {
      throw new Error("No user with this email found");
    }

    const savedPass = user.password;
    const result = await bcrypt.compare(body.password, savedPass);

    if (!result) {
      throw new Error("Password Incorrect");
    }

    const accessToken = await createAccessToken({
      email: user.email,
      role: user.role,
      password: user.password,
      userid: user.id
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

    return { accessToken, refreshToken };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const blockUser = async (userID) => {
  try {
    await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        isBlocked: true,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const unBlockUser = async (userID) => {
  try {
    await prisma.user.update({
      where: {
        id: userID,
      },
      data: {
        isBlocked: false,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
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
