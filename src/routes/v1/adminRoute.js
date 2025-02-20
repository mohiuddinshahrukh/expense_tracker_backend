import { Router } from "express";
import validateRequestBody from "../../middleware/validateRequestBody.middleware.js";
import validateUserRole from "../../middleware/adminMiddlewares/validateUserRole.middleware.js";
import { createUserRole, getAllUserRoles } from "../../controllers/admin/adminCRUDRole.controller.js";
import validateUserToken from "../../middleware/userMiddlewares/validateUserToken.middleware.js";
import validateRequest from "../../middleware/adminMiddlewares/validateRequest.js";
import expenseCategorySchema from "../../validators/expenseCategoryValidator.js";
import {
  createExpenseCategory,
  getAllUserExpenseCategories,
} from "../../controllers/admin/adminExpenseCategoryCRUD.controller.js";
import expenseValidator from "../../validators/expenseValidator.js";
import { createExpense, getAllUserExpenses } from "../../controllers/admin/adminExpenseCRUD.controller.js";
const router = Router();

router.get("/getAllUserRoles", validateUserToken, getAllUserRoles);
router.get("/getAllUserExpenses", validateUserToken, getAllUserExpenses);
router.get("/getAllUserExpenseCategories", validateUserToken, getAllUserExpenseCategories);
router.post("/createUserRole", validateUserToken, validateRequestBody, validateUserRole, createUserRole);
router.post(
  "/createExpenseCategory",
  validateUserToken,
  validateRequestBody,
  validateRequest(expenseCategorySchema),
  createExpenseCategory
);
router.post("/createExpense", validateUserToken, validateRequestBody, validateRequest(expenseValidator), createExpense);
export default router;
