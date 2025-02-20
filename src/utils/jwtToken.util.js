import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.userRole,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
};

const verifyToken = (token) => {
  try {
    if (jwt.verify(token, process.env.JWT_SECRET)) {
      return true;
    }
  } catch (error) {
    console.log("Error while reading user token: ", error.message);
    return null;
  }
};

export { generateToken, verifyToken };
