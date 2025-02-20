import Joi from "joi";
import mongoose from "mongoose";
// Custom Joi validation for MongoDB ObjectId
const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid ObjectId format");
  }
  return value;
};

const expenseValidator = Joi.object({
  expenseName: Joi.string().trim().min(3).max(255).required().messages({
    "string.base": "Expense name must be a string",
    "string.min": "Expense name must have minimum 3 characters",
    "string.max": "Expense name must be a maximum of 255 characters",
    "string.empty": "Expense name cannot be an empty field",
    "any.required": "Expense name is required",
  }),
  expenseAmount: Joi.number().positive().required().messages({
    "number.base": "Expense amount has to be a number",
    "number.positive": "Expense amount has to be greater than or equal to 0",
    "number.empty": "Expense amount cannot be empty",
    "any.required": "Expense amount is required",
  }),
  expenseDate: Joi.date().iso().required().messages({
    "date.base": "Expense date must be a valid date",
    "date.format": "Expense date must of the format (YYYY-MM-DD).",
    "date.empty": "Expense date cannot be empty",
    "any.required": "Expense date is required",
  }),
  expenseCategory: Joi.string().custom(objectId).required().messages({
    "string.base": "Expense category must be a valid MONGO_DB Object_ID",
    "string.empty": "Expense category cannot be empty",
    "any.required": "Expense category is required",
  }),
  expenseUserId: Joi.string().custom(objectId).required().messages({
    "string.base": "Expense User_ID must be a valid MONGO_DB Object_ID",
    "string.empty": "Expense User_ID cannot be empty",
    "any.required": "Expense User_ID is required",
  }),
  expenseDescription: Joi.string().trim().max(1000).allow("").messages({
    "string.max": "Expense description cannot be more than 1000 characters",
  }),
  expensePaymentMethod: Joi.string().valid("cash", "card", "bank transfer", "other").default("card").messages({
    "any.only": "Payment method must be 'Cash', 'Card', 'Bank Transfer', or 'Other'.",
  }),
  expenseStatus: Joi.string().valid("pending", "paid").default("paid").messages({
    "any.only": "Expense status must be 'Pending' or 'Paid'.",
  }),
  expenseReceiptImage: Joi.string().uri().allow("").messages({
    "string.uri": "Expense receipt image must be a valid URL.",
  }),
});

export default expenseValidator;
