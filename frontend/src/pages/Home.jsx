import { useState, useEffect } from "react"
import api from "../api"
import Expense from "../components/Expense"
import "../styles/Home.css"


function Home() {
    const [expense_list, setExepense_list] = useState([]);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    // Budget
    const [Budget_list, setBudget_list] = useState([]);
    const [Budgte_Title, setBudget_Title] = useState("");
    const [Budget_Amount, setBudget_Amount] = useState("");
    const [Budget_Date, setBudget_Date] = useState("");

    useEffect(() => {
        getExpenses();
        getBudget();
    }, []);

    const getExpenses = () => {
        api.get("/api/expenses/")
        .then((res) => res.data)
        .then((data) => {setExepense_list(data); console.log(data)})
        .catch((err) => alert(err));
    };

    const deleteExpense = (id) => {
        api.delete(`/api/expense/delete/${id}/`)
        .then((res) => {
            if (res.status === 204) alert("Expense deleted!");
            else alert("Failed to deleted expense.");
            getExpenses();
        }).catch((error) => alert(error));
    }

    const createExpense = (e) => {
        e.preventDefault()
        api.post("/api/expenses/", {amount, title, date})
        .then((res) => {
            if (res.status === 201) alert("Expense created!");
            else alert("Failed to create expense.")
            getExpenses();
            setBudget_Title("");
            setAmount("");
            setDate("");
        }).catch((error) => alert(error))
        

    }
    //Budget

    const getBudget = () => {
        api.get("/api/budgets/")
        .then((res) => res.data)
        .then((data) => {setBudget_list(data); console.log(data)})
        .catch((err) => alert(err));
    };

    const deleteBudget = (id) => {
        api.delete(`/api/budget/delete/${id}/`)
        .then((res) => {
            if (res.status === 204) alert("Budget deleted!");
            else alert("Failed to deleted budget.");
            getBudget();
        }).catch((error) => alert(error));
    }

    const createBudget = (e) => {
        e.preventDefault()
        api.post("/api/budgets/", {Budget_Amount, Budgte_Title, Budget_Date})
        .then((res) => {
            if (res.status === 201) alert("Budget created!");
            else alert("Failed to create expense.")
            getBudget();
            setBudget_Title("");
            setBudget_Amount("");
            setBudget_Date("");
        }).catch((error) => alert(error))
        

    }

    const totalExpense = expense_list.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);

    return <div>
        <div>
            <h2>Expenses</h2>
            <p>Total Expenses: ${totalExpense.toFixed(2)}</p>
            {expense_list.map((expense) => (
                <Expense expense={expense} onDelete={deleteExpense} key={expense.id}/>
        ))}
        </div>
        <h2> Create a Expense</h2>
        <form onSubmit={createExpense}>
            <label htmlFor="title">Title</label>
            <br />
            <input type="text" id="title" name="title" required on onChange={(e) => setTitle(e.target.value)}
            value={title}
            />
            <label htmlFor="amount">Amount</label>
            <br />
            <input type="number" id="amount" name="amount" required on onChange={(e) => setAmount(e.target.value)}
            value={amount}
            />
            <label htmlFor="date">Date</label>
            <br />
            <input type="date" id="date" name="date" required on onChange={(e) => setDate(e.target.value)}
            value={date}
            />
            <br />
            <input type="submit" value="Submit"></input>


        </form>
        <br/>
        <h2> Create a Budget</h2>
        <form onSubmit={createBudget}>
            <label htmlFor="title">Title</label>
            <br />
            <input type="text" id="title" name="title" required on onChange={(e) => setBudget_Title(e.target.value)}
            value={Budgte_Title}
            />
            <label htmlFor="amount">Amount</label>
            <br />
            <input type="number" id="amount" name="amount" required on onChange={(e) => setBudget_Amount(e.target.value)}
            value={Budget_Amount}
            />
            <label htmlFor="date">Date</label>
            <br />
            <input type="date" id="date" name="date" required on onChange={(e) => setBudget_Date(e.target.value)}
            value={Budget_Date}
            />
            <br />
            <input type="submit" value="Submit"></input>


        </form>

    </div>
}

export default Home