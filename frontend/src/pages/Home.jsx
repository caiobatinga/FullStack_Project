import { useState, useEffect } from "react"
import api from "../api"
import Expense from "../components/Expense"
import Budget from "../components/Budget"
import Recommendation from "../components/Recommendation"
import "../styles/index.css"
import wave from "../assets/wave.svg"
import Nav from "../components/Nav"
import { toast } from "react-toastify"

function Home() {
    const [expense_list, setExepense_list] = useState([]);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    // Budget
    const [budgetList, setBudgetList] = useState([]);
    const [selectedBudget, setSelectedBudget] = useState("");
    const [Budgte_Title, setBudget_Title] = useState("");
    const [Budget_Amount, setBudget_Amount] = useState("");
    const [Budget_Date, setBudget_Date] = useState("");

    useEffect(() => {
        getBudget();
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
            if (res.status === 204) toast.success("Expense deleted!");
            else alert("Failed to deleted expense.");
            getExpenses();
        }).catch((error) => alert(error));
    }

    const createExpense = (e) => {
        e.preventDefault()
        api.post("/api/expenses/", {amount, title, date, budget: selectedBudget})
        .then((res) => {
            if (res.status === 201) toast.success("Expense created!");
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
        .then((data) => {setBudgetList(data); console.log(data)})
        .catch((err) => alert(err));
    };

    const deleteBudget = (id) => {
        api.delete(`/api/budget/delete/${id}/`)
        .then((res) => {
            if (res.status === 204) toast.success("Budget deleted!");
            else alert("Failed to deleted budget.");
            getBudget();
        }).catch((error) => alert(error));
    }

    const createBudget = (e) => {
        e.preventDefault();
        api.post("/api/budgets/", {
            title: Budgte_Title,
            amount: Budget_Amount,
            date: Budget_Date
        })
        .then((res) => {
            if (res.status === 201) toast.success("Budget created!");
            else alert("Failed to create budget.");
            getBudget();
            setBudget_Title("");
            setBudget_Amount("");
            setBudget_Date("");
        })
        .catch((error) => alert(error));
    };

    /* Get OpenAI Recommendations */

    const getRecommendations = async () => {
        try {
            const response = await api.post('/api/generate-recommendation/', {
                budgets: budgetList,
                expenses: expense_list,
            });
            const recommendations = response.data.recommendations;
    
            // Display the recommendations
            toast.success("Recommendations generated!");
            console.log(recommendations);
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate recommendations.");
        }
    };

    const totalExpense = expense_list.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);

    return <div className="layout">
    <Nav />
 

    <div className="dashboard">
        <div className="grid-sm">
            <div className="form-wrapper">
                <h2 className="h3">Add New Expense</h2>
                <form onSubmit={createExpense}>
                    <div className="grid-xs">
                    <label htmlFor="title">Expense Name</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="eg. food"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        placeholder="eg. $250"
                        name="amount"
                        required
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    />
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        required
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                    />
                    <label htmlFor="budget">Budget</label>
                    <select
                        id="budget"
                        name="budget"
                        value={selectedBudget}
                        onChange={(e) => setSelectedBudget(e.target.value)}
                        required
                    >
                        <option value="">-- Select Budget --</option>
                        {budgetList.map((budget) => (
                            <option key={budget.id} value={budget.id}>
                                {budget.title}
                            </option>
                        ))}
                    </select>
                    <button
                        className="btn btn--dark"
                        type="submit"
                        value="Submit"
                    >Submit</button>
                    </div>
                </form>
            </div>
        </div>
        <br />
        <div className="form-wrapper">
            <form onSubmit={createBudget}>
            <div className="grid-xs">
                    <h2 className="h3">Create a Budget</h2>
                    <label htmlFor="title">Budget Name</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="eg. Travel"
                        required
                        onChange={(e) => setBudget_Title(e.target.value)}
                        value={Budgte_Title}
                    />
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        placeholder="eg. $200"
                        required
                        onChange={(e) => setBudget_Amount(e.target.value)}
                        value={Budget_Amount}
                    />
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        required
                        onChange={(e) => setBudget_Date(e.target.value)}
                        value={Budget_Date}
                    />
                    <button
                        className="btn btn--dark"
                        type="submit"
                        value="Submit"
                    >Submit</button>
            </div>
            </form>
        </div>
    </div>
    <div className="intro">
    <h2>Existing Budgets</h2>
    </div>
    <div className="budget-container">
        {budgetList.map((budget) => (
            <Budget
                budget={budget}
                expenses={expense_list}
                onDelete={deleteBudget}
                key={budget.id}
            />
        ))}
    </div>
    <div>
        <div className="intro">
        <h2>Expenses</h2>
        <p>Total Expenses: ${totalExpense.toFixed(2)}</p>
        </div>
        <div className="table">
        <table>
            <thead>
                <tr>
                    {
                    ["Name","Amount","Date", "Budget"].map((i, index)=> (<th key ={index}>{i}</th>))
                    }
                </tr>
            </thead>
            <tbody>

        {expense_list.map((expense) => (
            <Expense
                expense={expense}
                budget={Budget}
                onDelete={deleteExpense}
                key={expense.id}
            />
        ))}
            </tbody>
        </table>
        </div>
        <button className="btn btn--dark" onClick={getRecommendations}>
    Generate Financial Recommendations
</button>

    </div>
    <div className="container">
                <h1>Financial Dashboard</h1>
                {/* Pass the data to Recommendation */}
                <Recommendation budgets={budgetList} expenses={expense_list} />
            </div>

    <img src={wave} alt="" />
</div>

}

export default Home