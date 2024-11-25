import React from "react";
import "../styles/Expense.css"

function Budget_item({budget, onDelete})  {
    return <div className="note-container">
        <p className="note-title">{budget.title}</p>
        <p className="note-title">{budget.amount}</p>
        <button className="delete-button" onClick={() => onDelete(expense.id)}>
            Delete
        </button>
    </div>
};

export default Budget_item