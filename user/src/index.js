/// index.js

import React from "react";
import ReactDOM from "react-dom/client";

import {BrowserRouter as Router} from "react-router-dom";

import {CartContextProvider} from "./context/CartContext.js";

import App from "./App";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Router>
			<CartContextProvider>
				<App />
			</CartContextProvider>
		</Router>
	</React.StrictMode>
);
