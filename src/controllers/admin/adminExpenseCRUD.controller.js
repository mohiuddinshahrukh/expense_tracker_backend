import Expense from "../../models/expense.model.js";

const createExpense = async (req, res) => {
  try {
    const createdExpense = await Expense.create(req.body);
    if (createdExpense) {
      res.status(201).json({
        message: "Expense created successfully",
        data: createdExpense,
      });
    } else {
      res.status(400).json({
        message: "Expense creation failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Expense creation failed with server error",
      error: error.message,
    });
  }
};

const getAllUserExpenses = async (req, res) => {
  try {
    const allUserExpenses = await Expense.find();
    if (allUserExpenses) {
      return res.status(200).json({
        message: "All user expenses fetched",
        data: allUserExpenses,
        status: "success",
      });
    } else {
      return res.status(400).json({
        message: "Error fetching all user expenses",
        data: {},
        status: "failure",
      });
    }
  } catch (error) {
    return res.status(200).json({
      message: "Server error fetching all user expenses",
      error: error.message,
      status: "failure",
    });
  }
};
export { createExpense, getAllUserExpenses };
