//create a product
//update product
//delete a product
//managing orders
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const CreateProduct = async (body) => {
  const createdData = await prisma.product.create({
    name: body.name,
    description: body.description,
    price: body.price,
    quantity: body.quantity,
  });
  return createdData;
};
export const GetAllProduct = async () => {
  const foundProduct = await prisma.product.findMany({});
  return foundProduct;
};
export const UpdateProduct = async (_id, body) => {
    const payload = await prisma.product.update({
      where: {
        id: _id,
      },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        quantity: body.quantity,
      },
    });
    return payload
};
export const DeleteProduct = () => {};
