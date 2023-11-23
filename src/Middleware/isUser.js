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
      const user = await prisma.user.findUnique({
        where: { email: decodedToken.payload.email },
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
       req.user = {
        userid: user.id,
         email: user.email,
         role: user.role,
       };
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError" && req.cookies.refreshToken) {
        try {
          const refreshToken = req.cookies.refreshToken;
          const belongsTo = await prisma.user.findFirst({
            where:{
              refreshToken
            }
          })
          if(!belongsTo){
            return res.status(400).json({message: "no user with the refresh token in db"})
          }
          const decodedRefreshToken = jwt.verify(refreshToken, process.env.RTS);
          if(belongsTo.id !== decodedRefreshToken.userid){
            return res.status(401).json({message: "Refresh token doesnt match history"})
          }
          const newAccessToken = jwt.sign(
            {
              email: belongsTo.email,
              role: belongsTo.role,
              userid: belongsTo.id
            },
            process.env.ATS,
            { expiresIn: "1d" }
          );
          req.user = {
            email: decodedRefreshToken.email,
            role: decodedRefreshToken.role,
            userid: decodedRefreshToken.id
          };
          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            maxAge: 24 * 24 * 1000 * 60,
            secure: true,
          });
          return next();
        } catch (refreshTokenError) {
          console.error(refreshTokenError)
          return res.status(401).json({message: " Invalid Refresh Token"})
        }
      }
      console.log(err)
      return res.status(401).json({ message: "No t Refresh Token " });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authMiddleware;
