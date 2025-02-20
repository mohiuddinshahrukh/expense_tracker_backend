import mongoose from "mongoose";

const ExpenseCategorySchema = mongoose.Schema(
  {
    expenseCategoryName: {
      type: String,
      required: [true, "Please provide expense category name"],
      unique: true,
      maxlength: 255,
    },
    expenseCategoryDescription: {
      type: String,
      required: [true, "Please provide expense category description"],
      maxlength: 1000,
    },
    expenseCategoryType: {
      type: String,
      enum: ["income", "expense", "transfer"],
      default: "expense",
    },
    expenseCategoryIsActive: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
    expenseParentCategory: {
      type: mongoose.Types.ObjectId,
      ref: "ExpenseCategory",
      default: null,
    },
    expenseCategoryIcon: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
const ExpenseCategory = mongoose.model("ExpenseCategory", ExpenseCategorySchema);
export default ExpenseCategory;
