import logomark from "../assets/logomark.svg"
import { Form, NavLink } from "react-router-dom"

const Nav = () => {
    return (
        <nav>
            <NavLink to="/" aria-label="Home">
            <img src={logomark} alt="Home" height={30} />
            <span>SpendWiser</span>
            </NavLink>
            <Form
            method="post"
            action="/logout">
                <button type="submit" className="btn btn--warning">
                <Span>Logout</Span>
                </button>
            </Form>
        </nav>
    )

}