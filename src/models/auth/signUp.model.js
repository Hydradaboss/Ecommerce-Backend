import { signUpSchema } from "../../validation/user.schema.js";
import { createAccessToken, createRefreshToken } from "../../utils/createToken.js";
import { hashPassword } from "../../utils/hashPass.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const SignIn = async (email, firstName, mobile, lastName, password) => {
  try {
    const result = signUpSchema.validate({
      email,
      firstName,
      mobile,
      lastName,
      password,
    });
    if (result.error) {
      console.log(result.error);
      throw new Error("Error validating");
    }
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (findUser) {
      throw new Error("User already exists");
    }
    const hashedPass = await hashPassword(password);

    const newMobile = parseInt(mobile, 10);
    if (isNaN(newMobile)) {
      throw new Error("Number is NaN");
    }
    const user = await prisma.user.create({
      data: {
        firstname: firstName,
        lastname: lastName,
        email: email,
        mobile: newMobile,
        password: hashedPass,
      },
    });
    const accessToken = createAccessToken({
      email: user.email,
      role: user.role,
      password: user.password,
    });
    const refreshToken = createRefreshToken({
      email: user.email,
      userid: user.id,
    });
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: refreshToken,
        isLoggedin: true,
      },
    });
    return { refreshToken, accessToken };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
