import { Router } from "express";
import catchAsync from "../../utils/catchAsync.js";
import { signup, signin, signout } from "../../controllers/authController.js";
import validateUserSignup from "../../middleware/userMiddlewares/validateUser.middleware.js";
import validateRequestBody from "../../middleware/validateRequestBody.middleware.js";
import checkIfUserAlreadyExists from "../../middleware/userMiddlewares/userAlreadyExists.middleware.js";
import appendRoleID from "../../services/appendRoleID.service.js";
import validateUserSignIn from "../../middleware/userMiddlewares/validateUserSignIn.middleware.js";
import validateUserToken from "../../middleware/userMiddlewares/validateUserToken.middleware.js";

const router = Router();
router.post("/signup", validateRequestBody, validateUserSignup, checkIfUserAlreadyExists, appendRoleID, signup);
router.post("/signin", validateRequestBody, validateUserSignIn, signin);
router.post("/signout", validateUserToken, signout);

export default router;
