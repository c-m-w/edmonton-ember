/// useCart.js

import {useContext} from "react";

import {cartContext} from "../context/CartContext";

export default function useCart() {

    const cart = useContext(cartContext);

    return cart;
}