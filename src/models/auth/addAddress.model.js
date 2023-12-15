import { addressSchema } from "../../validation/address.schema.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const addUserAddress = async (addressBody, userID) => {
  const result = addressSchema.validate(addressBody);
  if (result.error) {
    throw new Error("error validating address");
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
