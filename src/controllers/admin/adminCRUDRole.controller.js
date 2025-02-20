import Role from "../../models/roles.model.js";

const createUserRole = async (req, res) => {
  // const createdRole = await
  try {
    const createdRole = await Role.create(req.body);
    if (!createdRole) {
      return res.status(400).json({
        message: "Role creation failed",
      });
    }
    return res.status(201).json({
      message: "User role created",
      createdRole: createdRole,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user role",
      error: error.message,
    });
  }
};

const getAllUserRoles = async (req, res) => {
  try {
    const allUserRoles = await Role.find();
    if (allUserRoles) {
      return res.status(200).json({
        message: "All user roles fetched",
        data: allUserRoles,
        status: "success",
      });
    } else {
      return res.status(400).json({
        message: "Error fetching all user roles",
        data: {},
        status: "failure",
      });
    }
  } catch (error) {
    return res.status(200).json({
      message: "Server error fetching all user roles",
      error: error.message,
      status: "failure",
    });
  }
};

export { createUserRole, getAllUserRoles };
