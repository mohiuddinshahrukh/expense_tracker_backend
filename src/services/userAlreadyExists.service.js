import User from "../models/user.model.js";

const findUserByEmailOrUsername = async (userEmail, userName) => {
  const emailLower = userEmail.toLowerCase();
  const userNameLower = userName.toLowerCase();
  var emailExists = false;
  var userNameExists = false;

  try {
    const foundUsers = await User.find({ $or: [{ userEmail: emailLower }, { userName: userNameLower }] }).select(
      "userEmail userName"
    );
    foundUsers.forEach((user) => {
      if (user.userEmail === emailLower) {
        emailExists = true;
      }
      if (user.userName === userNameLower) {
        userNameExists = true;
      }
    });

    return [emailExists, userNameExists];
  } catch (error) {
    console.log("Error inside findUserByEmailOrUsername function", error);
    throw new Error("Database error while checking if user exists or not");
  }
};

export default findUserByEmailOrUsername;
