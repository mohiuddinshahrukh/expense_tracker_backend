import { body, validationResult } from "express-validator";
import Role from "../../models/roles.model.js";

const validateUserSignup = async (req, res, next) => {
  try {
    const allowedRoles = await Role.getAllowedRoles();

    await Promise.all([
      body("firstName").notEmpty().withMessage("First name is a required field").run(req),
      body("lastName").notEmpty().withMessage("Last name is a required field").run(req),
      body("userName").notEmpty().withMessage("userName name is a required field").run(req),
      body("userEmail").notEmpty().withMessage("Email is a required field").run(req),
      body("userEmail").isEmail().withMessage("Email format is invalid").run(req),
      body("userRole").isIn(allowedRoles).withMessage("Role can only be 'admin' or 'user'").run(req),
      body("userPassword")
        .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
        .withMessage(
          "Password must contain 1 of each: lowercase, uppercase, number, symbol & must be of minimum length 8 characters"
        )
        .run(req),
    ]);

    console.log("Allowed roles", allowedRoles);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  } catch (error) {
    console.error("Error in fetching roles: ", error);
    res.status(500).json({ message: "Server error while validating user" });
  }
};
export default validateUserSignup;
