/// Header.js

import {Link, useLocation} from "react-router-dom";

export default function Header() {

    const {pathname} = useLocation();

    return (
        <header>
            <div className="home-link-container">
                <Link 
                    to="/"
                    className="home-link">
                    <img src="/assets/images/logo.png" />
                </Link>
            </div>

            <nav>
                <Link 
                    to="/" 
                    className={pathname === "/" ? "selected" : ""}>
                        Home</Link>
                <Link 
                    to="/products/peppers" 
                    className={pathname.includes("products") ? "selected" : ""}>
                        Products</Link>
                <Link 
                    to="/contact" 
                    className={pathname === "/contact" ? "selected" : ""}>
                        Contact</Link>
            </nav>
        </header>
    );
}