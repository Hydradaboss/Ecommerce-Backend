export const httpUpdateProduct = async (req, res) => {
  const payload = await UpdateProduct(req.query, req.body);
  res.status(200).send(payload);
};
