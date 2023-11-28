import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userSchema from "../validation/user.schema";
const prisma = new PrismaClient();

export const SignIn = async (firstName, lastName, email, password, mobile) => {
  try {
    const {} = userSchema.attempt()
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (findUser) {
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
        isLoggedin: true
      },
    });
    return { refreshToken, accessToken };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const Login = async (body) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
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
        isLoggedin: true
      },
    });

    return { accessToken, refreshToken};
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const logOut = async (email) => {
  try {
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        refreshToken: "",
        isLoggedin: false
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const addUserAddress = async (addressBody, userID) => {
  const existingAddress = await prisma.address.findUnique({
    where: { userId: userID },
  });
  if (existingAddress) {
    const updatedAddress = await prisma.address.update({
      where: { id: existingAddress.id },
      data: {
        street: addressBody.street,
        city: addressBody.city,
        state: addressBody.state,
        postalCode: addressBody.postalCode,
      },
    });
    return updatedAddress;
  } else {
    const newAddress = await prisma.address.create({
      data: {
        userId: userID,
        street: addressBody.street,
        city: addressBody.city,
        state: addressBody.state,
        postalCode: addressBody.postalCode,
      },
    });
    return newAddress;
  }
};
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
const createAccessToken = async (payload) => {
  const token = jwt.sign({ payload }, process.env.ATS, {
    expiresIn: "1d",
  });
  return token;
};
const createRefreshToken = async (payload) => {
  const token = jwt.sign({ payload }, process.env.RTS, {
    expiresIn: "30d",
  });
  return token;
};
