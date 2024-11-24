import { useState, useEffect } from "react"
import api from "../api"

function Home() {
    const [expense_list, setExepense_list] = useState([]);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        getExpenses();
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
        }).catch((error) => alert(error));
        getExpenses();

    }
    const createExpense = (e) => {
        e.preventDefault()
        api.post("/api/expenses/", {amount, title, date})
        .then((res) => {
            if (res.status === 201) alert("Expense created!");
            else alert("Failed to create expense.")
        }).catch((error) => alert(error))
        getExpenses;

    }
    return <div>
        <div>
            <h2>Expenses</h2>
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

    </div>
}

export default Home