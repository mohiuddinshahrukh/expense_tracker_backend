import mongoose from "mongoose";

const RoleSchema = mongoose.Schema(
  {
    roleName: {
      required: [true, "User role is required"],
      enum: ["user", "admin"],
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);
RoleSchema.statics.getAllowedRoles = function () {
  return this.schema.path("roleName").enumValues;
};

RoleSchema.statics.getExistingRoles = async (roleName) => {
  try {
    return await Role.findOne({ roleName: roleName.toLowerCase() });
  } catch (error) {
    throw new Error("Error in finding users from database");
  }
};

RoleSchema.statics.getRoleID = async (role) => {
  try {
    return await Role.findOne({ roleName: role });
  } catch (error) {
    throw new Error("Error in getting role from DB")
  }
};
const Role = mongoose.model("Role", RoleSchema);
export default Role;
