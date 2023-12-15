import { addUserAddress } from "../../models/auth/addAddress.model.js";
export const httpAddUserAddress = async (req, res) => {
  await addUserAddress(req.body, parseInt(req.user.userid));
  res.status(201).json({ done: "done" });
};
