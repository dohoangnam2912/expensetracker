const ExpenseSchema = require("../models/expenseModels");

exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date} = req.body;

    const expense = new ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    });

    try {
        //Validation
        if(!title || !category || !date || !description) {
            return res.status(400).json({message: 'All fields are required'})
        }
        if(amount <= 0 || !amount === 'number') {
            return res.status(400).json({message: 'Amount must be a positive number'})
        }
        let expenseSave = await expense.save()
        console.log(expenseSave);
        res.status(200).json({message: 'Expense added'})
    } catch (error) {
        console.log('error' + error);
        res.status(500).send(error);
    }

    console.log(expense);
    // console.log(req.body);
}

exports.getExpense = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt: -1});
        res.status(200).json(expenses)
    } catch (error) {
        console.log('error' + error);
        res.status(500).send(error);
    }
}

exports.deleteExpense = async (req, res) => {
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
        res.status(200).json({message: 'Expense deleted'})
    }) .catch ((error) => {
        console.log('error' + error);
        res.status(500).send(error);
    })
}