/// ProductNavigator.js

import {Link, useLocation} from "react-router-dom";

export default function ProductNavigator() {

    const {pathname} = useLocation();

    return (
        <nav id="product">
            <Link
                to="/products/peppers"
                className={pathname.includes("peppers") ? "selected" : ""}>
                <h1>Peppers</h1></Link>
            <Link
                to="/products/seeds"
                className={pathname.includes("seeds") ? "selected" : ""}>
                <h1>Seeds</h1></Link>
            <Link
                to="/products/cuttings"
                className={pathname.includes("cuttings") ? "selected" : ""}>
                <h1>Cuttings</h1></Link>
        </nav>
    );
}