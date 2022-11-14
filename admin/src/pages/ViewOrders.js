/// ViewOrders.js

import {useState, useEffect} from "react";

import {useNavigate} from "react-router-dom";

import makeAPIRequest from "../utils/makeAPIRequest";

import SubHeader from "../components/SubHeader";

export default function ViewOrders() {

    const [orderList, setOrderList] = useState([]);
    const navigate = useNavigate();

    const getOrders = async () => {

        const response = await makeAPIRequest("data/orders", "GET");

        if (response.success) {

            setOrderList(response.data);
        }
    }

    const editOrder = (id) => {
        
        navigate(`${id}`);
    }

    useEffect(() => {getOrders()}, []);

    const orderElements = orderList.map((order, i) => {

        console.log(order);
        const contact = JSON.parse(order.contact);
        const fulfilledState = <span className="state fulfilled">(Fulfilled)</span>;
        const unfulfilledState = <span className="state unfulfilled">(Unfulfilled)</span>;

        return (
            <div 
                className="list-entry"
                key={i}>
                <span className="id">{order.id}</span>
                <span className="first-last">{contact.firstName} {contact.lastName}</span>
                {order.fulfilled
                    ? fulfilledState
                    : unfulfilledState}
                <img
                    src="/assets/icons/arrow-to-right-light.svg"
                    className="icon"
                    onClick={() => {editOrder(order.id)}} />
            </div>
        );
    }).reverse();

    return (
        <div className="list">
            <SubHeader title="View orders" showReturnArrow={true} />
            {orderElements}
        </div>
    );
}