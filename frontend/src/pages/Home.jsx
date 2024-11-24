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
    }

    return <div>Home</div>
}

export default Home