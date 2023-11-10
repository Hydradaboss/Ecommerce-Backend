import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const SignIn = async (body) => {
  const password = body.password;
  const mobile = body.mobile;
  const hashedPass = await hashPassword(password);
  const createdUser = await prisma.user.create({
    data: {
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      mobile: mobile,
      password: hashedPass,
    },
  });
  const token = await createToken(createdUser);
  console.log(createdUser)
  return token;
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const createToken = async (payload) => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

const createRefreshToken = async (payload) => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  return token;
};

export const login = async (passedEmail, password) => {
  try {
    const User = await prisma.user.findUnique({
      where: {
        email: passedEmail,
      }
    });

    if(!User){
      throw new Error("No user with this email found")}
    const savedPass = User.password;
    const result = await bcrypt.compare(password, savedPass);
    if(!result){
      throw new Error("Password Incorrect")
    }
    const rToken = await createRefreshToken(rToken)
    const finalRToken = await prisma.user.update({
      where:{
        email: User.email
      }
    })
    const final = await createToken(User)
    console.log(User, finalRToken)
    return final
  } catch (error) {
    console.log(error)
  }
  
}
