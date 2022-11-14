/// ActionDisplay.js

import {Link} from "react-router-dom";

import useCart from "../hooks/useCart";

export default function ActionDisplay(props) {

    const {render, showCart} = props;
    const cart = useCart();

    return (
        <div className="action">
            <div className="action-header">
                <h1>{props.title}</h1>
                {showCart && 
                <div className="view-cart">
                    <Link to="/cart">
                        <img
                            src="/assets/icons/shopping-cart-light.svg"
                            className="icon"
                            />
                    </Link>
                    <span 
                        className={"cart-item-count" + (cart.cartItems.length === 0 ? " disabled" : "")}>
                        {cart.cartItems.length}
                    </span>
                </div>
                }
            </div>
            <div className={props.useBody ? "action-body" : ""}>
                {render()}
            </div>
        </div>
    );
}