/// Cart.js

import {useState} from "react";

import ActionDisplay from "../components/ActionDisplay";

import useCart from "../hooks/useCart";
import makeAPIRequest from "../utils/makeAPIRequest";

export default function Cart() {

    const cart = useCart();
    const [orderInfo, setOrderInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        payment: ""
    });
    const formFilled = orderInfo.firstName 
                        && orderInfo.lastName
                        && orderInfo.email
                        && orderInfo.phone
                        && orderInfo.payment;
    let total = 0;

    const orderInfoChange = (e) => {

        setOrderInfo(oldOrderInfo => ({...(oldOrderInfo), [e.target.name]: e.target.value}));
    }

    const requestOrder = async (e) => {

        e.preventDefault();

        const items = cart.cartItems.map(item => ({size: item.size, count: item.count}));
        const response = await makeAPIRequest("order", "POST", {contactInfo: orderInfo, items: items});

        if (response.success) {

            cart.clear();
            
        } else {

            for (let i in cart.cartItems) {

                if (cart.cartItems[i].size === response.data.invalid) {

                    /// todo display error message
                }
            }
        }
    }

    const cartElements = cart.cartItems.map((item, i) => {
    
        console.log(item);
        const itemPrice = item.sizeInfo.price * item.count;
        total += itemPrice;

        return (
            <div 
                className="cart-item"
                key={i}>
                <img
                    src="/assets/icons/trash-light.svg"
                    className="icon"
                    onClick={() => cart.removeItem(i)} />
                <img src={item.productInfo.preview_image} />
                <div className="cart-item-info">
                    <div className="cart-item-info-top">
                        <h2>{item.productInfo.name}</h2>
                        <div className="cart-info-pair">
                            <span className="label">Amount</span>
                            <span className="value">{item.sizeInfo.amount}g</span>
                        </div>
                        <div className="cart-info-pair">
                            <span className="label">Count</span>
                            <span className="value">x{item.count}</span>
                        </div>
                    </div>
                    <div className="cart-item-price">
                        <h3>Price</h3>
                        <span>$ {itemPrice}</span>
                    </div>
                </div>
            </div>
        );
    });

    if (cartElements.length === 0) {
        return (
            <ActionDisplay 
                showCart={false}
                title={"Cart"}
                render={() =>
                    <div className="empty-action">
                        <h1>No items in cart...</h1>
                    </div>
                } />
        );
    }

    return (
        <ActionDisplay 
            showCart={false}
            title={"Cart"}
            useBody={true}
            render={() =>
                <div className="cart-list">
                    <div>
                        {cartElements}
                    </div>
                    <div className="order-info">
                        <div className="total">
                            <h2>Total</h2>
                            <h2>$ {total}</h2>
                        </div>
                        <form
                            onSubmit={requestOrder}>
                            <label
                                htmlFor="first-name">First name</label>
                            <input
                                type="text"
                                name="firstName"
                                id="first-name"
                                value={orderInfo.firstName}
                                onChange={orderInfoChange} />
                            <label
                                htmlFor="first-name">Last name</label>
                            <input
                                type="text"
                                name="lastName"
                                id="last-name"
                                value={orderInfo.lastName}
                                onChange={orderInfoChange} />
                            <label
                                htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                value={orderInfo.email}
                                onChange={orderInfoChange} />
                            <label
                                htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                value={orderInfo.phone}
                                onChange={orderInfoChange} />

                            <div className="payment-method">
                                <input
                                    type="radio"
                                    name="payment"
                                    id="payment-cash"
                                    value="cash"
                                    onChange={orderInfoChange} />
                                <label
                                    htmlFor="payment-cash">Cash</label>
                            </div>
                            <div className="payment-method">
                                <input
                                    type="radio"
                                    name="payment"
                                    id="payment-etransfer"
                                    value="etransfer"
                                    onChange={orderInfoChange} />
                                <label
                                    htmlFor="payment-etransfer">E-transfer</label>
                            </div>
                            <button
                                disabled={!formFilled}>Request order</button>
                        </form>
                    </div>
                </div>
            } />
    );
}