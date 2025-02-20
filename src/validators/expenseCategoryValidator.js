import Joi from "joi";
import mongoose from "mongoose";

const expenseCategorySchema = Joi.object({
  expenseCategoryName: Joi.string().trim().min(3).max(255).required().messages({
    "string.empty": "Expense category name cannot be empty",
    "string.min": "Expense category name must be at least 3 characters",
    "string.max": "Expense category name can be at max 255 characters",
  }),
  expenseCategoryDescription: Joi.string().trim().min(3).max(1000).required().messages({
    "string.empty": "Expense category description cannot be empty",
    "string.min": "Expense category description must be at least 3 characters",
    "string.max": "Expense category description can be at max 1000 characters",
  }),
  expenseCategoryType: Joi.string().valid("income", "expense", "transfer").default("expense").messages({
    "any.only": "Expense category type can only be 'income', 'expense' or 'transfer'",
  }),
  expenseCategoryIsActive: Joi.boolean().default(true),
  expenseParentCategory: Joi.string()
    .allow(null, "")
    .custom((value, helpers) => {
      if (value && !mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message("Invalid expense parent category ID");
      }
      return value;
    }),
  expenseCategoryIcon: Joi.string().uri().allow("").messages({
    "string.uri": "Expense category icon must be a valid URL",
  }),
});
export default expenseCategorySchema;
