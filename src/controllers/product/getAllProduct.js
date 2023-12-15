export const httpGetAllProduct = async (req, res) => {
  const payload = await GetAllProduct();
  res.status(200).send(payload);
};