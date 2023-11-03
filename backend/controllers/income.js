const IncomeSchema = require("../models/incomeModels");

exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date} = req.body;

    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    });

    console.log(income);
}