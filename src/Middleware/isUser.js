import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

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
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        userid: decodedToken.userId,
        email: decodedToken.email,
        role: decodedToken.role,
      };
      const user = await prisma.user.findUnique({
        where: { id: decodedToken.userId },
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError" && req.cookies.refreshToken) {
        try {
          const refreshToken = req.cookies.refreshToken;
          const decodedRefreshToken = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
          );
          const newAccessToken = jwt.sign(
            {
              userId: decodedRefreshToken.userId,
              email: decodedRefreshToken.email,
              role: decodedRefreshToken.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "15m" } 
          );
          await prisma.user.update({
            where: { id: decodedRefreshToken.userId },
            data: { accessToken: newAccessToken },
          });
          req.user = {
            userid: decodedRefreshToken.userId,
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
          console.log(refreshTokenError)
          return res
            .status(401)
            .json({ message: "Invalid or expired refresh token" });
        }
      }
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authMiddleware;
