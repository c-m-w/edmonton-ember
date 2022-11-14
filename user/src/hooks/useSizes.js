/// useSizes.js

import {useState, useEffect} from "react";

import makeAPIRequest from "../utils/makeAPIRequest";

export default function useSizes(id) {

    const [sizes, setSizes] = useState([]);

    useEffect(() => {(async () => {

        const response = await makeAPIRequest(`sizes/${id}`, "GET");

        if (response.success) {

            setSizes(response.data);
        }
    })()}, [id]);

    return sizes;
}