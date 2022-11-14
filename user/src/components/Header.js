/// Header.js

import {Link, useLocation} from "react-router-dom";

export default function Header() {

    const {pathname} = useLocation()

    console.log(pathname);

    return (
        <header>
            <Link 
                to="/"
                className="home-link">
                <h1>Edmonton ember</h1>
            </Link>

            <nav>
                <Link 
                    to="/products/peppers" 
                    className={pathname === "/products/peppers" ? "selected" : ""}>
                        Peppers</Link>
                <Link 
                    to="/products/seeds" 
                    className={pathname === "/products/seeds" ? "selected" : ""}>
                        Seeds</Link>
                <Link 
                    to="/products/cuttings" 
                    className={pathname === "/products/cuttings" ? "selected" : ""}>
                        Cuttings</Link>
                <Link 
                    to="/contact" 
                    className={pathname === "/contact" ? "selected" : ""}>
                        Contact</Link>
            </nav>
        </header>
    );
}