import React from "react";
import "../styles/Expense.css"

function Expense_item({expense, budget, onDelete})  {
    return <>
        <tr>
            <td>{expense.title}</td>
            <td>{expense.amount}</td>
            <td>{expense.date}</td>
            <td>{expense.budget}</td>
            <td><button className="delete-button" onClick={() => onDelete(expense.id)}>
                Delete
            </button></td>
        </tr>
    </>
    
};

export default Expense_item