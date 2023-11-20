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
      const decodedToken = jwt.verify(token, process.env.ATS);
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
      if (err.name === "TokenExpiredError" && req.cookies.refreshToken ) {
        try {
          const refreshToken = req.cookies.refreshToken;
          console.log("the refresh token is", refreshToken)
          const decodedRefreshToken = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
          );
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
          return res
            .status(401)
            .json({ message: "Invalid token" });
        }
      }
      return res.status(401).json({ message: "Invalid or expired token" , err: err});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authMiddleware;
