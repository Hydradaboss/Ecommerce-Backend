//add to cart
//managing cart
//searchoing product
//viewing product detail
//wishlist
//payment option
//checkout
// add address || Done

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const addUserAddress = async (addressBody, userID) => {
  const existingAddress = await prisma.address.findFirst({
    where: { userId: userID },
  });

  if (existingAddress) {
    // There is already an address, so this would update it
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
    // No address found for this user, so this would create a new address
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

export const addToProductCart = async (userId, productId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { cart: true }, 
  });


  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (user && product) {
    if (user.cart) {
      const updatedCart = await prisma.cart.update({
        where: { id: user.cart.id },
        data: {
          product: { connect: { id: productId } },
        },
      });
      return updatedCart;
    } else {
      const newCart = await prisma.cart.create({
        data: {
          userid: userId,
          product: { connect: { id: productId } },
        },
      });
      return newCart;
    }
  } else {
    return "User or Product not found.";
  }
};
export const addToProdcutToWishlist = async (userId, productId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { cart: true },
  });
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (user && product) {
    if (user.cart) {
      const updatedCart = await prisma.cart.update({
        where: { id: user.cart.id },
        data: {
          product: { connect: { id: productId } },
        },
      });
      return updatedCart;
    } else {
      const newCart = await prisma.wishlist.create({
        data: {
          userid: userId,
          product: { connect: { id: productId } },
        },
      });
      return newCart;
    }
  } else {
    return "User or Product not found.";
  }
};

export const removeProdcutfromWishlist = () => {};
export const removeProdcutfromCart = () => {};
