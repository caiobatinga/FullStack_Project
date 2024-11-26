import logomark from "../assets/logomark.svg";
import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <nav>
            <NavLink to="/" aria-label="Home">
                <img src={logomark} alt="Home" height={30} />
                <span>SpendWiser</span>
            </NavLink>
            <form method="post" action="/logout">
                <button type="submit" className="btn btn--warning">
                    <span>Logout</span>
                </button>
            </form>
        </nav>
    );
};

export default Nav;
