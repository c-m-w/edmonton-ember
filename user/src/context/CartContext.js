/// CartContext.js

import {Component, createContext} from "react";

const cartContext = createContext();

class CartContextProvider extends Component {

    state = {
        cartItems: []
    };

    load = () => {

        const cart = localStorage.getItem("cart");

        cart && this.setState(JSON.parse(cart));
    }

    save = () => {

        localStorage.setItem("cart", JSON.stringify(this.state));
    }

    addItem = (item) => {

        for (const i of this.state.cartItems) {
            
            if (i.size === item.size) {
                
                return; // cant add same product to cart twice
            }
        }

        this.setState(oldState => ({cartItems: [...oldState.cartItems, item]}));
    }

    removeItem = (index) => {

        this.setState(oldState => ({cartItems: oldState.cartItems.filter((item, i) => i !== index)}));
    }

    clear = () => {

        this.setState({cartItems: []});
    }

    componentDidMount() {

        this.load();
    }

    componentDidUpdate() {

        this.save();
    }

    render() {

        const {state, addItem, removeItem, clear} = this;

        return (
            <cartContext.Provider value={{...state, addItem, removeItem, clear}}>
                {this.props.children}
            </cartContext.Provider>
        )
    }
}

export {CartContextProvider, cartContext};
