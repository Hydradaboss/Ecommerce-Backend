import jwt from "jsonwebtoken";


const authmiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Authentication requires a token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = {
      userid: decodedToken.UserId,
      Name: decodedToken.name,
    };
    next();
  } catch (error){
    console.log(error)
    return res.status(401).json({ message: " error" });
  }
};

export default authmiddleware;
