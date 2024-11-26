import React from "react";
import "../styles/Expense.css";

function Budget_item({ budget, expenses, onDelete }) {
    // Calculate total expenses for this budget
    const totalExpense = expenses
        .filter((expense) => expense.budget === budget.id)
        .reduce((acc, expense) => acc + parseFloat(expense.amount), 0);

    // Calculate remaining amount
    const remaining = budget.amount - totalExpense;

    return (
        <div className="budget">
            <div className="progress-text">
                <h3>{budget.id}. {budget.title}</h3>
                <p>${budget.amount}</p>
            </div>
            {/* Update the value to reflect totalExpense */}
            <progress max={budget.amount} value={totalExpense}></progress>
            <div className="progress-text">
                <small>${totalExpense}</small>
                <small>${remaining}</small>
            </div>
            <button className="delete-button" onClick={() => onDelete(budget.id)}>
                Delete
            </button>
        </div>
    );
}

export default Budget_item;
