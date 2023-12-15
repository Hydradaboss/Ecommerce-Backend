import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
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
