import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import error from "./error";

const prisma = new PrismaClient();

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authentication requires a token" });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, process.env.ATS);
      console.log(decodedToken,"access")
      req.user = {
        userid: decodedToken.payload.userid,
        email: decodedToken.payload.email,
        role: decodedToken.payload.role,
      };
      const user = await prisma.user.findUnique({
        where: { id: decodedToken.payload.userid },
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError" && req.cookies.refreshToken) {
        try {
          const refreshToken = req.cookies.refreshToken;
          const decodedRefreshToken = jwt.verify(refreshToken, process.env.RTS);
          const newAccessToken = jwt.sign(
            {
              _id: decodedRefreshToken.userid,
              email: decodedRefreshToken.email,
              role: decodedRefreshToken.role,
            },
            process.env.ATS,
            { expiresIn: "1h" }
          );
          await prisma.user.update({
            where: { id: decodedRefreshToken.userid },
            data: { accessToken: newAccessToken },
          });
          req.user = {
            _id: decodedRefreshToken.userid,
            email: decodedRefreshToken.email,
            role: decodedRefreshToken.role,
          };
          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            maxAge: 24 * 24 * 1000 * 60,
            secure: true,
          });
          return next();
        } catch (refreshTokenError) {
          console.error(error)
          return res.status(401).json({message: " Invalid Refresh Token"})
        }
      }

      return res.status(401).json({ message: "No Refresh Token " });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authMiddleware;
