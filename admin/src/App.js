/// App.js

import {Routes, Route} from "react-router-dom";

import Header from "./components/Header";
import EditProduct from "./pages/EditProduct";
import Home from "./pages/Home";
import ViewProducts from "./pages/ViewProducts";
import ViewOrders from "./pages/ViewOrders";
import EditOrder from "./pages/EditOrder";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="admin">
					<Route index element={
						<Home />
					} />
					<Route path="products">
						<Route index element={
							<ViewProducts />
						} />
						<Route path=":id" element={
							<EditProduct />
						} />
					</Route>
					<Route path="orders">
						<Route index element={
							<ViewOrders />
						} />
						<Route path=":id" element={
							<EditOrder />
						} />
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
