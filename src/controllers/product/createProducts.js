import { CreateProduct, GetAllProduct, UpdateProduct } from "../../models/product/admin.product.js"

export const httpCreateProduct = async (req, res) => {
  const { name, description, price, picture, quantity, type} = req.body
  if(!name || !description || !price || !quantity || !type){
    res.status(400).json({msg : "Provide all the neccessary fields"})
  }
  const payload = await CreateProduct(req.body);
  res.status(200).send(payload);
};

