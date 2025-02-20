import Role from "../models/roles.model.js";

const appendRoleID = async (req, res, next) => {
  try {
    const roleName = req?.body?.userRole?.toLowerCase();
    console.log(req.body);
    const role  = await Role.getRoleID(roleName);
    console.log(role);

    if (!role?._id || !role) {
      res.status(400).json({ message: "User role not found and couldn't be appended" });
    }
    req.body.userRole = role._id;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Server error while role appending",
      error: error.message,
    });
  }
};

export default appendRoleID;
