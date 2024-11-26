import Nav from "../components/Nav"

function NotFound() {
    return <div className="layout"><Nav />
    <div className="intro">
    <h1>Uh Oh! Page Not Found!</h1>
    <p>The page you're looking for doesn't exist!</p>
    </div>
    </div>
}

export default NotFound