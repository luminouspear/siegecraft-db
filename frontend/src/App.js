import "./App.css";
import CardDatabase from "./CardDatabase";
import NavBar from "./NavBar";
import React, {useState, useEffect } from "react";
import {  CardProvider } from "./context/CardContext"

// const API_URL = "http://localhost:5006/";

// const CardContext = createContext();

// const CardProvider = ({ children }) => {
	// // initialize an empty set of cards
// 	const [cards, setCards] = useState([]);

// 	useEffect(() => {
// 		fetch(`${API_URL}api/cards/`)
// 			.then((res) => res.json())
// 			.then((data) => {
// 				console.log(data);
// 				setCards(data);
// 			});
// 	}, []);

// 	return (
// 		<CardContext.Provider value={{ cards }}>
// 			{children}
// 		</CardContext.Provider>
// 	);
// };

function App() {
	return (
		<React.Fragment>
			<CardProvider>
				<NavBar />
				<CardDatabase />
			</CardProvider>
		</React.Fragment>
	);
}

export default App;
