/// ViewProducts.js

import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import SubHeader from "../components/SubHeader";
import makeAPIRequest from "../utils/makeAPIRequest";

export default function ViewProducts() {

    const [productList, setProductList] = useState([]);
    const navigate = useNavigate();

    const getProducts = async () => {

        const response = await makeAPIRequest("data/products", "GET");

        if (response.success) {

            setProductList(response.data);
        }
    }

    const newProduct = async () => {
        
        const response = await makeAPIRequest("data/products", "POST");
        getProducts();
    }

    const editProduct = (id) => {

        navigate(`${id}`);
    }

    useEffect(() => {getProducts()}, []);

    const productElements = productList.map((product, i) => {

        return (
            <div className="list-entry" key={i}>
                <span className="id">{product.id}</span>
                <span className="name">{product.name}</span>
                <span className="category">({product.category})</span>
                <img
                    src="/assets/icons/edit-light.svg"
                    className="icon"
                    onClick={() => editProduct(product.id)} />
            </div>
        );
    });

    return (
        <div className="list">
            <SubHeader title="View products" showReturnArrow={true} />
            {productElements}
            <img 
                src="/assets/icons/file-plus-light.svg" 
                className="new-entry icon"
                onClick={() => newProduct()} />
        </div>
    )
}