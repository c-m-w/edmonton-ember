/// Header.js

import {Link, useLocation} from "react-router-dom";

import {useState, useEffect} from "react";

export default function Header() {

    const {pathname} = useLocation();
    const [width, setWidth] = useState(0);

    console.log(window.screen.width);

    const setWidthWrapper = () => {

        setWidth(window.screen.width);
    }

    useEffect(() => {

        window.addEventListener('resize', setWidthWrapper);

        return () => {

          window.removeEventListener('resize', setWidthWrapper)
        }
      }, []);

    return (
        <header>
            <div className="home-link-container">
                <Link 
                    to="/"
                    className="home-link">
                    <h1>Edmonton ember</h1>
                </Link>
            </div>

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
                {window.screen.width > 900 && // todo find somewhere else to put this
                    <Link 
                    to="/contact"
                    className={pathname === "/contact" ? "selected" : ""}>
                        Contact
                    </Link>
                }
            </nav>
        </header>
    );
}