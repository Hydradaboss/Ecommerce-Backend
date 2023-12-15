import  bcrypt from "bcryptjs"
import { createAccessToken, createRefreshToken } from "../../utils/createToken.js";
import { loginSchema } from "../../validation/user.schema.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const Login = async (body) => {
  try {
    const data = loginSchema.validate({
      email: body.email,
      password: body.password,
    });
    if (data.error) {
      throw new Error("Error Validating");
    }
    const user = await prisma.user.findUnique({
      where: {
        email: data.value.email,
      },
    });

    if (!user) {
      throw new Error("No user with this email found");
    }

    const result = await bcrypt.compare(data.value.password, user.password);

    if (!result) {
      throw new Error("Password Incorrect");
    }

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

    return { accessToken, refreshToken };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
