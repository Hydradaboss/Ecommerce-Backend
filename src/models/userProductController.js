//add to cart || Done
// add address || Done
// adding to wishlist || Done
// geting user cart || Done
//getting user wishlist || Done
//managing cart
//searching product
//viewing product detail
//payment option
//checkout

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const addUserAddress = async (addressBody, userID) => {
  const existingAddress = await prisma.address.findFirst({
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

export const getUserWishlist = async (userid) => {
  const user   = await prisma.user.findUnique({
    where:{
      id:userid
    }
  }) 

  if(!user){
    throw new Error("no user found")
  }
  try {
      const wishlist = await prisma.wishlist.findMany({
        where: {
          userId: userid,
        },
      });

      return wishlist;
  } catch (error) {
    console.log(error)
    throw new Error("ERROr FETCHING WISHLIST")
  }
};

export const getUserCart = async (userid) => {
   const user = await prisma.user.findUnique({
     where: {
       id: userid,
     },
   });

   if (!user) {
     throw new Error("no user found");
   }
   try {
     const cart = await prisma.cart.findMany({
       where: {
         userId: userid,
       },
     });

     return cart;
   } catch (error) {
     console.log(error);
     throw new Error("ERROr FETCHING CART");
   }
};
export const removeProdcutfromWishlist = async (userid, productId) => {
   try {
     const deletedItem = await prisma.wishlist.delete({
       where: {
         id: productId,
         userId: userid
       },
     });
     return deletedItem; 
   } catch (error) {
     throw new Error("Error removing product from the wishlist");
   }
};

export const removeProdcutfromCart = async (userid, productId) => {
  try {
    const deletedItem = await prisma.cart.delete({
      where: {
        id: productId,
        userId: userid,
      },
    });
    return deletedItem;
  } catch (error) {
    throw new Error("Error removing product from the wishlist");
  }
};
