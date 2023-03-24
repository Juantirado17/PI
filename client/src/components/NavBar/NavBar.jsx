import { Link } from "react-router-dom";
import  React from "react";
import style from "./NavBar.module.css"



const NavBar = () => {
    return (
        <div className= {style.container}>
            <ul>
            <Link to= '/home'>
                <li>Home</li>
            </Link>
            <Link to = '/create'>
            <li>Create dog!</li>
            </Link>
            <Link to='/'>Exit</Link>
            </ul>
        </div>
    )
}

export default NavBar;