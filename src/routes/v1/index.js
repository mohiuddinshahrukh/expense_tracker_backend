import { Router } from "express";
import authRoute from "./authRoute.js";
import adminRoute from "./adminRoute.js";
import validateRequestBody from "../../middleware/validateRequestBody.middleware.js";
import validateUser from "../../middleware/userMiddlewares/validateUser.middleware.js";
const router = Router();

router.use("/auth", authRoute);
router.use("/dashboard", (req, res) => {});
router.use("/admin", adminRoute);
router.use("/other_other", (req, res) => {});

export default router;
