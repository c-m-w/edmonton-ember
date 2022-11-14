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

        console.log("REMOVING ITEM");
        console.log(index)
        this.setState(oldState => ({cartItems: oldState.cartItems.filter((item, i) => i !== index)}));
    }

    clear = () => {

        this.setState({cartItems: []});
    }

    componentDidMount() {

        this.load();
        console.log("loaded cart");
        console.log(this.state);
    }

    componentDidUpdate() {

        this.save();
        console.log("new cart state");
        console.log(this.state);
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
