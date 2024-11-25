import React from "react";
import "../styles/Expense.css"

function Budget_item({budget, expenses, onDelete})  {

    const totalExpense = expenses
    .filter((expense) => expense.budget === budget.id)
    .reduce((acc, expense) => acc + parseFloat(expense.amount), 0);

    const remaining = budget.amount - totalExpense;

    return <div className="note-container">
        <p className="note-title">{budget.title}</p>
        <p className="note-title">Allocated Amount: {budget.amount}</p>
        <p>Remaining Amount: ${remaining}</p>
        <button className="delete-button" onClick={() => onDelete(budget.id)}>
            Delete
        </button>
    </div>
};

export default Budget_item