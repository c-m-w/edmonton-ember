/// Home.js

import {Link} from "react-router-dom";

export default function Home() {

    return (
        <nav>
            <Link to="products">View products</Link>
            <Link to="orders">View orders</Link>
        </nav>
    );
}