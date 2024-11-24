import React from "react";
import "../styles/Expense.css"

function Expense_item({expense, onDelete})  {
    return <div className="note-container">
        <p className="note-title">{expense.title}</p>
        <p className="note-title">{expense.amount}</p>
        <p className="note-date">{expense.date}</p>
        <button className="delete-button" onClick={() => onDelete(expense.id)}>
            Delete
        </button>
    </div>
};

export default Expense_item