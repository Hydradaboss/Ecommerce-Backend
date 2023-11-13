import { CreateProduct, GetAllProduct, UpdateProduct } from "../models/adminProductModel.js";

export const httpUpdateProduct = async (req, res) => {
  const payload = await UpdateProduct( req.query, req.body)
  res.status(200).send(payload)

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
