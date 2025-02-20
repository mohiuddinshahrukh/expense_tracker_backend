import ExpenseCategory from "../../models/expense_category.model.js";

const createExpenseCategory = async (req, res) => {
  try {
    const findCategory = await ExpenseCategory.findOne({ expenseCategoryName: req.body.expenseCategoryName });
    if (findCategory) {
      return res.status(400).json({ message: "Expense category already exists" });
    }
    const newCategory = await ExpenseCategory.create(req.body);
    if (newCategory) {
      res.status(201).json({
        message: "Expense category created successfully",
        data: newCategory,
      });
    } else {
      res.status(400).json({
        message: "Creation of expense category failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error while creating expense category",
      error: error.message,
    });
  }
}; 

const getAllUserExpenseCategories = async (req, res) => {
  try {
    const allUserExpenseCategories = await ExpenseCategory.find();
    if (allUserExpenseCategories) {
      return res.status(200).json({
        message: "All user expense categories fetched",
        data: allUserExpenseCategories,
        status: "success",
      });
    } else {
      return res.status(400).json({
        message: "Error fetching all user expense categories",
        data: {},
        status: "failure",
      });
    }
  } catch (error) {
    return res.status(200).json({
      message: "Server error fetching all user expense categories",
      error: error.message,
      status: "failure",
    });
  }
};

export { createExpenseCategory, getAllUserExpenseCategories };
