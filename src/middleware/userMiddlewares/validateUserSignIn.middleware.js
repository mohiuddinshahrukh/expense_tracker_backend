import User from "../../models/user.model.js";

const validateUserSignIn = async (req, res, next) => {
  try {
    if (!req.body.userEmail && !req.body.userPassword) {
      return res.status(400).json({
        message: "User Email and password are required to login",
      });
    }
    if (!req.body.userEmail) {
      return res.status(400).json({
        message: "User Email is required to login",
      });
    }
    if (!req.body.userPassword) {
      return res.status(400).json({
        message: "User password is required to login",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "User login failed with server error",
      error: error.message,
    });
  }
};

export default validateUserSignIn;
