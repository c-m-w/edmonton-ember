/// Product.js

import {useState} from "react";

import SizeSelection from "./SizeSelection";

import useSizes from "../hooks/useSizes";
import useCart from "../hooks/useCart";

export default function Product(props) {

    const sizes = useSizes(props.id);
    const cart = useCart();
    const [sizeSelection, setSizeSelection] = useState(-1);
    const [countSelection, setCountSelection] = useState(1);
    let heatElements = [];
    let countElements = [];

    const getSelectedSize = () => {

        return sizes.filter(size => size.id == sizeSelection)[0];
    }

    const sizeClicked = (id) => {

        setSizeSelection(sizeSelection == id ? -1 : id);
    }

    const addItemToCart = () => {

        cart.addItem({
            size: sizeSelection,
            count: parseInt(countSelection),
            productInfo: props,
            sizeInfo: getSelectedSize()
        });

        setSizeSelection(-1);
    }

    for (let i = 0; i < 5; i++) {

        heatElements.push(<div
                            key={i}
                            className={"heat-element" + (i < props.heat ? " filled" : "")} />);
    }

    if (sizeSelection !== -1) {

        const selectedSize = getSelectedSize();

        for (let i = 0; i < Math.min(selectedSize.stock, 5); i++) {
            
            countElements.push(<option value={i+1} key={i}>x{i+1}</option>);
        }
    } else {

        countSelection !== 1 && setCountSelection(1);
    }

    const sizeElements = sizes.map((size, i) => {

        return (
            <SizeSelection 
                key={i}
                {...size}
                onClick={sizeClicked}
                selected={sizeSelection == size.id} />
        );
    });

    return (
        <div 
            className="product"
            key={props.id}>
            <img src={props.preview_image} />
            <div className="product-data">
                <div className="name-heat">
                    <h3>{props.name}</h3>
                    <div className="heat-elements">
                        {heatElements}
                    </div>
                </div>
                <div className="sizes">
                    {sizeElements}
                </div>
                <div className="add-to-cart">
                    <select
                        disabled={sizeSelection == -1}
                        value={countSelection}
                        onChange={(e) => setCountSelection(e.target.value)}>
                        {countElements}
                    </select>
                    <button
                        disabled={sizeSelection == -1}
                        onClick={addItemToCart}>Add to cart</button>
                </div>
            </div>
        </div>
    );
}