import React from 'react';
import { Link } from 'react-router-dom'



const LandingPage = () => {
    return (
        <div>
            <title>Landing Page</title>
            <br />
            <h1>Bienvenos a la pagina de Perro</h1>
            <br />
            <Link to="/home">
                <button>Acceder</button>
            </Link>

        </div>
    )
}

export default LandingPage;