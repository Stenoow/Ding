import {Link} from "react-router-dom";
import '../App.css'
import React from "react";

function Layout(props: React.PropsWithChildren) {

    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Accueil</Link>
                        </li>
                        <li>
                            <Link to="/enterprise">Entreprises</Link>
                        </li>
                        <li>
                            <Link to="/store">Magasins</Link>
                        </li>
                        <li>
                            <Link to="/product">Produits</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                {props.children}
            </main>
            <footer>

            </footer>
        </div>
    )
}

export default Layout