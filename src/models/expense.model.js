import mongoose from "mongoose";
import User from "./user.model.js";
import ExpenseCategory from "./expense_category.model.js";

const ExpenseSchema = mongoose.Schema(
  {
    expenseName: {
      type: String,
      maxlength: 255,
      required: [true, "Please provide expense name"],
    },
    expenseAmount: {
      type: Number,
      required: [true, "Please provide expense amount"],
    },
    expenseDate: {
      type: Date,
      required: [true, "Please provide expense date"],
    },
    expenseCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExpenseCategory",
      required: [true, "Please provide expense category"],
    },
    expenseUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Expense must be linked to a user"],
    },
    expenseDescription: {
      type: String,
      maxlength: 1000,
    },
    expensePaymentMethod: {
      type: String,
      enum: ["cash", "card", "bank transfer", "other"],
      default: "card",
    },
    expenseStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "paid",
    },
    expenseReceiptImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", ExpenseSchema);
export default Expense;
