import { addUserAddress } from "../models/userProductModel.js";

export const httpAddUserAddress = async (req, res) => {
  const payload = await addUserAddress(req.body, req.query);
  res.status(201).send(payload);
};
export const addToProductCart = async (req, res) => {
  const payload = await addUserAddress(req.body, req.query);
  res.status(200).send(payload);
};
export const addToProdcutToWishlist = async (req, res) => {
  const payload = await addUserAddress(req.body, req.query);
  res.status(200).send(payload);
};
export const getUserWishlist = async (req, res) => {
  const payload = await addUserAddress(req.body, req.query);
  res.status(200).send(payload);
};
export const getUserCart = async (req, res) => {
  const payload = await addUserAddress(req.body, req.query);
  res.status(200).send(payload);
};
export const removeProdcutfromWishlist = async (req, res) => {
  const payload = await addUserAddress(req.body, req.query);
  res.status(200).send(payload);
};
export const removeProdcutfromCart = async (req, res) => {
  const payload = await addUserAddress(req.body, req.query);
  res.status(200).send(payload);
};
