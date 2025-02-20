import User from "../../models/user.model.js";
import { verifyToken } from "../../utils/jwtToken.util.js";

const validateUserToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[0];
  try {
    if (!token) {
      return res.status(401).json({
        message: "Access denied, no token provided",
      });
    }
    const decode = verifyToken(token);
    const isTokenStillValid = await User.findOne({ activeToken: token });
    if (!decode || isTokenStillValid === null) {
      return res.status(403).json({ message: "Invalid / expired token" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while jwt token checking", error: error.message });
  }
};
export default validateUserToken;
