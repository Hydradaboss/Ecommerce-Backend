import { CreateProduct, GetAllProduct } from "../models/adminProductModel.js";
export const httpUpdateProduct = (req, res) => {
  const payload = await 

};
export const httpCreateProduct = async (req, res) => {
  const payload = await CreateProduct(req.body);
  res.status(200).send(payload);
};
export const httpGetAllProduct = async (req, res) => {
  const payload = await GetAllProduct();
  res.status(200).send(payload);
};
export const httpDeleteProduct = (req, res) => {};
