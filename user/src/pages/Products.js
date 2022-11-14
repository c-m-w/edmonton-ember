/// Products.js

import {useParams, Link} from "react-router-dom";

import ActionDisplay from "../components/ActionDisplay";
import Product from "../components/Product";

import useProducts from "../hooks/useProducts";

export default function Products() {

    const params = useParams();
    const products = useProducts(params.category);

    const productElements = products.map((product, i) => {
    
        return (
            <Product {...product} key={i} />
        );
    });

    if (productElements.length === 0) {
        return (
            <ActionDisplay 
                showCart={true}
                title={params.category}
                render={() =>
                    <div className="empty-action">
                        <h1>No products here...</h1>
                    </div>
                } />
        );
    }

    return (
        <ActionDisplay 
            showCart={true}
            title={params.category}
            render={() =>
                <div className="product-list">
                    {productElements}
                </div>
            } />
    );
}
