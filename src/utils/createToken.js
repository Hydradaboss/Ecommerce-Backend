import jwt from "jsonwebtoken";

export const createAccessToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.ATS, {
    expiresIn: "1d",
  });
  return token;
};
export const createRefreshToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.RTS, {
    expiresIn: "30d",
  });
  return token;
};
