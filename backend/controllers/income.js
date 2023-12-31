const IncomeSchema = require("../models/incomeModels");

exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date} = req.body;

    const income = new IncomeSchema({
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
        let incomeSave = await income.save()
        console.log(incomeSave);
        res.status(200).json({message: 'Income added'})
    } catch (error) {
        console.log('error' + error);
        res.status(500).send(error);
    }

    console.log(income);
    // console.log(req.body);
}

exports.getIncome = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1});
        res.status(200).json(incomes)
    } catch (error) {
        console.log('error' + error);
        res.status(500).send(error);
    }
}

exports.deleteIncome = async (req, res) => {
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
        res.status(200).json({message: 'Income deleted'})
    }) .catch ((error) => {
        console.log('error' + error);
        res.status(500).send(error);
    })
}