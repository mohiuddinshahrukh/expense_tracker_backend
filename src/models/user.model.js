import mongoose from "mongoose";
import Role from "./roles.model.js";
import bcrypt from "bcryptjs";
const UserSchema = mongoose.Schema(
  {
    userID: {
      type: String,
    },
    firstName: {
      required: [true, "Please provide the FIRST NAME"],
      type: String,
    },
    lastName: {
      required: [true, "Please provide the LAST NAME"],
      type: String,
    },
    userName: {
      required: [true, "Please provide the USER NAME"],
      type: String,
      lowercase: true,
    },
    userEmail: {
      required: true,
      type: String,
    },
    userPassword: {
      required: true,
      type: String,
    },
    userRole: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      lowercase: true,
    },
    activeToken: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("userPassword")) {
      const salt = await bcrypt.genSalt(10);
      this.userPassword = await bcrypt.hash(this.userPassword, salt);
    }
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isValidPassword = async (password) => {
  return await bcrypt.compare(password, this.userPassword);
};

class UserClass {
  static async getUserByUserEmail(userEmail) {
    return await this.findOne({ userEmail });
  }
  static async isValidPassword(userEmail, password) {
    const user = await this.findOne({ userEmail });
    return await bcrypt.compare(password, user.userPassword);
  }
}

UserSchema.loadClass(UserClass);

const User = mongoose.model("User", UserSchema);
export default User;
