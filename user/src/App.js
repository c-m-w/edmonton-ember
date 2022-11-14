/// App.js

import {Routes, Route} from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route index element={
					<Home />
				} />
				<Route path="/products/:category" element={
					<Products />
				} />
				<Route path="/cart" element={
					<Cart />
				} />
			</Routes>
		</>
	);
}

export default App;
