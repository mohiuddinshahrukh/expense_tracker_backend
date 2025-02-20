import { body, validationResult } from "express-validator";
import Role from "../../models/roles.model.js";

const validateUserRole = async (req, res, next) => {
  try {
    body("roleName").notEmpty().withMessage("User role must be provided");
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Role creation failed with errors: ",
        errors: errors.array(),
      });
    }
    const existingRoles = await Role.getExistingRoles(req.body.roleName);
    if (existingRoles) {
      return res.status(400).json({ message: "Role already exists" });
    }

    errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Role creation failed.",
        error: errors.array(),
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: "Error in adding user role",
      error: error,
      error_message: error.message,
    });
  }
};

export default validateUserRole;
