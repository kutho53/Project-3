import { Outlet, Link } from "react-router-dom";
import NavBar from './navBar'

export default function Header(){
    return(
        <header>
            <div>
                <h1>Hours Tracker</h1>
            </div>
            <nav>
                <NavBar/>
            </nav>
        </header>
    )
}