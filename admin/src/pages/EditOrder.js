/// EditOrder.js

import {useState, useEffect} from "react";

import {useParams, useNavigate} from "react-router-dom";

import SubHeader from "../components/SubHeader";
import makeAPIRequest from "../utils/makeAPIRequest";

export default function EditOrder() {

    const [data, setData] = useState();
    const [n, setN] = useState(0);
    const contact = data && JSON.parse(data.contact);
    const items = data && JSON.parse(data.items);
    const params = useParams();
    let total = 0;
    let allocated = items && true;

    if (items) {
        for (let item of items) {

            allocated &= item.allocated;
        }
    }

    const fulfilledStatus = <h2 className="status fulfilled">(Fulfilled)</h2>;
    const unfulfilledStatus = <h2 className="status unfulfilled">(Unfulfilled)</h2>;

    const getData = async () => {

        const response = await makeAPIRequest(`data/orders/${params.id}`, "GET");

        if (response.success) {

            setData(response.data);
            console.log("data right from server")
            console.log(response.data);
        }
    }

    const updateData = async (newData) => {
        
        const response = await makeAPIRequest(`data/orders/${params.id}`, "PUT", newData);
        
        if (response.success) {

            setN(n + 1);
        }
    }

    const changeAllocation = async (i) => {

        items[i].allocated = !items[i].allocated;

        await updateData({
            id: data.id,
            fulfilled: data.fulfilled,
            contact: data.contact,
            items: JSON.stringify(items)
        });
    }

    const changeFulfilledState = async () => {

        let dataCopy = structuredClone(data);

        dataCopy.fulfilled = !dataCopy.fulfilled;
        updateData(dataCopy);
    }

    useEffect(() => {getData()}, [n]);

    const itemElements = items && items.map((item, i) => {

        console.log(item);
        const price = item.count * item.size_info.price;
        total += price;

        return (
            <div 
                className="item"
                key={i} >
                <div className="name-data">
                    <h2>{item.product_info.name}</h2>
                    <div className="item-data">
                        <span>{item.size_info.amount}g</span>
                        <span>x{item.count}</span>
                    </div>
                </div>
                <div className="price-fulfilled">
                    <h2>$ {price}</h2>
                    <img 
                        src={item.allocated ? "/assets/icons/check-square-light.svg" : "/assets/icons/square-light.svg"}
                        className={"icon allocate" + (data.fulfilled ? " disabled" : "")}
                        onClick={() => {!data.fulfilled && changeAllocation(i)}} />
                </div>
            </div>
        )
    })

    console.log(contact);
    console.log("items")
    console.log(items);

    return (
        <>
        {data && 
            <div className="order-editor">
                <SubHeader title="Edit order" showReturnArrow={true} />
                <div className="id-status">
                    <h2 className="id">{data.id}</h2>
                    {data.fulfilled ? fulfilledStatus : unfulfilledStatus}
                </div>
                <h3>{contact.firstName} {contact.lastName}</h3>
                <span className="contact-info">{contact.email}</span>
                <span className="contact-info">{contact.phone}</span>
                
                <h3 className="items-header">Items</h3>
                <div className="items">
                    {itemElements}
                </div>
                <div className="total">
                    <h2>Total</h2>
                    <h2>$ {total}</h2>
                </div>
                <button
                    disabled={!allocated}
                    onClick={changeFulfilledState}>
                    {data.fulfilled ? "Mark unfulfilled" : "Mark fulfilled"}
                </button>
            </div>
        }
        </>
    );
}