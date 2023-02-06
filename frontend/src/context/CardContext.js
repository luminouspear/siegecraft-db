import React, { createContext, useState, useEffect } from "react";

export const CardContext = createContext();

export const CardProvider = (props) => {
    const [cards, setCards] = useState([]);

    const API_URL = "http://localhost:5006/";

	// const CardContext = createContext();

	// const CardProvider = ({ children }) => {
	// 	//initialize an empty set of cards

	useEffect(() => {
		fetch(`${API_URL}api/cards/`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setCards(data);
			});
	}, []);


	return (
		<CardContext.Provider value={{ cards, setCards }}>
			{props.children}
		</CardContext.Provider>
	);
};
