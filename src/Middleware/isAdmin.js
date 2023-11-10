const verifyAdmin = (req, res, next) => {
  const role = req.user.role
  if (role === "admin") {
    next();
  } else {
    throw new Error("User Not an Admin");
  }
};
export default verifyAdmin;
