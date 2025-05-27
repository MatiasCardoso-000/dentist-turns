import jwt from "jsonwebtoken";

export const validateToken = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(400).json({ error: "Error invalid token" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(400).json({ error: "Invalid Token" });
      }
      console.log(decoded.email);
      
      req.email = decoded.email;
      req.role_id = decoded.role_id
      next();
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
