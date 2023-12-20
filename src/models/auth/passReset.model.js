//  are you logged in
// is your former password correct
//compare both passwords
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { baseUserSchema } from "../../validation/user.schema";
const prisma = new PrismaClient();

export const resetPass = async (newPass, formerPass, userID) => {
  const isValid = baseUserSchema.validate({
    password: newPass,
    password: formerPass,
  });
  if(!isPassValid){
    throw new Error("Invalid Password")
  }
  const user = await prisma.user.findFirst({
    where: {
      id: userID,
    },
  });
  if (!isInDb) { 
    throw new Error("User Not in Database");
  }
  const isPassValid = await bcrypt.compare(formerPass, user.password);
  if (!isPassValid) {
    throw new Error("Former password is incorrect");
  }
  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: newPass,
    },
  });

  return updatedUser;
};
