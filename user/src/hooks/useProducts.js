/// useProducts.js

import {useState, useEffect} from "react";

import makeAPIRequest from "../utils/makeAPIRequest";

export default function useProducts(category) {

    const [productList, setProductList] = useState([]);

    useEffect(() => {(async () => {

        const response = await makeAPIRequest(`products/${category}`, "GET");

        if (response.success) {

            setProductList(response.data);
        }
    })()}, [category]);

    return productList;
}