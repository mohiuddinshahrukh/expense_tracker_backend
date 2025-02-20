import User from "../models/user.model.js";
import { generateToken } from "../utils/jwtToken.util.js";

export const signup = async (req, res) => {
  try {
    const newUser = await new User(req.body);
    await newUser.save();

    if (newUser) {
      return res.status(201).json({ message: "User created", userData: newUser });
    } else {
      return res.stats(400).json({ message: "User creation failed" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error creating user, please try again later.",
      error: error.message,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { userName, userPassword } = req.body;
    const user = await User.getUserByUserName(userName);
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }
    const password = await User.isValidPassword(userName, userPassword);
    if (!password) {
      return res.status(400).json({ message: "User password is incorrect" });
    }
    const token = generateToken(user);
    if (token) {
      const userTokenPatch = await User.findByIdAndUpdate(user._id, { activeToken: token });
      if (userTokenPatch) {
        return res.status(200).json({ message: "User logged in successfully", token: token });
      } else {
        return res.status(400).json({ message: "User active token patch fail" });
      }
    }
    return res.status(400).json({ message: "Error logging user in" });
  } catch (error) {
    res.status(500).json({ message: "Error in user login: ", error: error.message });
    console.log(error);
  }
};

export const signout = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { userName: req.body.userName },
      { $set: { activeToken: null } },
      { new: true }
    );
    if (!user) {
      return res.status(400).json({ message: "Error in signout" });
    }

    return res.status(200).json({ message: "User successfully signed out" });
  } catch (error) {
    console.log("Error in user signout");
    console.log(error.message);
    return res.status(500).json({ message: "Error signing out", error: error.message });
  }
};
