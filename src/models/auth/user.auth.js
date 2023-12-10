import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { loginSchema, signUpSchema } from "../../validation/user.schema.js";
import {
  createAccessToken,
  createRefreshToken,
} from "../../utils/createToken.js";
import { hashPassword } from "../../utils/hashPass.js";
import { addressSchema } from "../../validation/address.schema.js";
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
export const Login = async (body) => {
  try {
    const data = loginSchema.validate({
      email: body.email,
      password: body.password,
    });
    if(data.error){
      throw new Error("Error Validating")
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
export const logOut = async (email) => {
  try {
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        refreshToken: "",
        isLoggedin: false,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const addUserAddress = async (addressBody, userID) => {
  const result = addressSchema.validate(addressBody)
  if(result.error){
    throw new Error("error validating address")
  }
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
