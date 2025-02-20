import Role from "../../models/roles.model.js";
import findUserByEmailOrUsername from "../../services/userAlreadyExists.service.js";

const checkIfUserAlreadyExists = async (req, res, next) => {
  try {
    const { userEmail, userName } = req.body;
    const [emailExists, userNameExists] = await findUserByEmailOrUsername(userEmail, userName);

    if (emailExists && userNameExists) {
      return res.status(400).json({ message: "User name and user email already exist" });
    }
    if (emailExists) {
      return res.status(400).json({ message: "User email already exists" });
    }
    if (userNameExists) {
      return res.status(400).json({ message: "User name already exists" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Error: ", error: error.message });
  }
};

export default checkIfUserAlreadyExists;
