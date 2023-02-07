import React, { useContext, useState, useEffect, useRef } from "react";
import { CardContext } from "./context/CardContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// FontAwesome setup stuff from https://fontawesome.com/v5/docs/web/use-with/react
import {
	faArrowLeft,
	faArrowRight,
	faClose,
} from "@fortawesome/free-solid-svg-icons";

export default function CardList() {
	const { cards } = useContext(CardContext);
	// console.log('cards: ', cards);

	//adding a modal window to show a card when clicked on.
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedCardIndex, setSelectedCardIndex] = useState(0);
	const [dimensions, setDimensions] = useState({ top: 0, left: 0 });

	const [filteredCards, setFilteredCards] = useState(cards);
	const [elementFilters, setElementFilters] = useState({});
	const [searchTerm, setSearchTerm] = useState("");
	const selectedCard = filteredCards[selectedCardIndex];
	const [showDefaultText, setShowDefaultText] = useState(false)

	// filtering a react list referenced from this video (but highly adapted): https://www.youtube.com/watch?v=weFOaIHlDpo
	// and this https://www.youtube.com/watch?v=xAqCEBFGdYk

	const handleFilterChange = ({ searchTerm, elementFilters }) => {
		console.log("searchTerm: ", searchTerm);
		console.log("elementFilters: ", elementFilters);

		setSearchTerm(searchTerm);
		setElementFilters((prevElementFilters) => {
			return { ...prevElementFilters, ...elementFilters };
		});
		console.log("After setElementFilters: ", elementFilters);
	};

	useEffect(() => {
		let filtered = cards;

		if (searchTerm) {
			const lsearch = searchTerm.toLowerCase();
			filtered = filtered.filter((card) => {
				return (
					card.cardName.toLowerCase().includes(lsearch) ||
					card.type.toLowerCase().includes(lsearch) ||
					card.subType.toLowerCase().includes(lsearch) ||
					card.superType.toLowerCase().includes(lsearch) ||
					card.cardText.toLowerCase().includes(lsearch)
				);
			});
		}
		setFilteredCards(filtered);
		console.log("after filtering: ", filtered);
	}, [elementFilters, cards, searchTerm]);

	const backButton = <FontAwesomeIcon icon={faArrowLeft} />;
	const forwardButton = <FontAwesomeIcon icon={faArrowRight} />;
	const closeModalButton = <FontAwesomeIcon icon={faClose} />;

	const handleBackButtonClick = () => {
		setShowDefaultText(false);
		if (selectedCardIndex > 0) {
			setSelectedCardIndex(selectedCardIndex - 1);
		}
	};

	const handleForwardButtonClick = () => {
		setShowDefaultText(false);
		if (selectedCardIndex < cards.length - 1) {
			setSelectedCardIndex(selectedCardIndex + 1);
		}
	};

	//Modal window code adapted from https://www.freecodecamp.org/news/how-to-build-a-modal-with-javascript/

	const openModal = (index) => {
		setSelectedCardIndex(index);
		setShowDefaultText(false);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setSelectedCardIndex(0);
		setIsModalOpen(false);
	};

	//Fixing position for modal window code adapted from https://thewebdev.info/2021/09/05/how-to-get-scroll-position-with-react/
	const modalRef = useRef(null);
	useEffect(() => {
		if (isModalOpen) {
			const { offsetWidth, offsetHeight } = modalRef.current;
			setDimensions({
				top: window.scrollY + (window.innerHeight - offsetHeight) / 2,
				left: (window.innerWidth - offsetWidth) / 2,
			});
		}
	}, [isModalOpen]);

	const getCardElementalAffiliationString = (affiliation, elementID) => {
		let result = [];
		// console.log(elementID)

		for (let i = 0; i < affiliation; i++) {
			result += elementID;
		}

		return <>{result}</>;
	};

	function processCardText(cardText) {
		let parts = cardText.split(/[%^ß]/);
		let processedText = parts.map((part, index) => {
			if (part === "") return null;
			if (index % 4 === 1) return <b key={index}>{part}</b>;
			if (index % 4 === 3) return <i key={index}>{part}</i>;
			if (index % 2 === 0) return <span key={index}>{part}</span>;
			return <br key={index} />;
		});
		return processedText;
	}

	//Checkbox code adapted from https://stackoverflow.com/questions/55968689/how-can-i-use-checkbox-form-in-react

	//Moved onto another method above but adapted this code, so I left it in the comments.

	// const CardFilter = ({ cards, onFilterChange }) => {
	// 	const [searchTerm, setSearchTerm] = useState("");
	// 	const [elementFilters, setElementFilters] = useState({
	// 		Earth: true,
	// 		Air: true,
	// 		Fire: true,
	// 		Water: true,
	// 		Light: true,
	// 		Shadow: true,
	// 		Neutral: true,
	// 	});
	// };

	// const handleElementFilterChange = (event) => {
	// 	const { elementName, checked } = event.target;
	// 	setElementFilters({ ...elementFilters, [elementName]: checked });
	// 	onFilterChange({ searchTerm, elementFilters });
	// };

	// const handleSearchTermChange = (event) => {
	// 	setSearchTerm(event.target.value);
	// 	onFilterChange({ searchTerm: event.target.value, elementFilters });
	// };

	return (
		<>
			{!isModalOpen ? (
				<></>
			) : (
				<div
					className=" z-100 absolute sticky h-[100vh] w-full inset-0 transform bg-black/95 flex items-center justify-center overflow-hidden"
					ref={modalRef}
				>
					<div className="p-8 overflow-hidden">
						<button
							className="absolute top-0 right-0 m-4 text-white h-16 w-16 text-4xl hover:text-yellow-300"
							onClick={closeModal}
						>
							{closeModalButton}
						</button>
						<div className="grid grid-flow-col grid-cols-12 items-center justify-center">
							<button
								className="text-white text-4xl col-span-1 md:col-span-1"
								onClick={handleBackButtonClick}
								disabled={selectedCardIndex === 0}
							>
								{backButton}
							</button>

							<div
								className={`${
									selectedCard.type === "Territory"
										? "rotate-90 transform transition-transform duration-300 ease-out col-span-6"
										: "rotate-0 "
								} w-fit relative col-span-10`}
							>
								<img
									className={`${
										selectedCard.type === "Territory"
											? ""
											: "rotate-0"
									} rounded-2xl cursor-pointer w-full`}
									src={`/${selectedCard.imageUrl}`}
									alt={`selectedCard.imageAltText`}
										onError={(e) => {
										setShowDefaultText(true)
										e.target.src =
											"/assets/images/prime/card_images/card_back.jpg";
									}}
									onClick={closeModal}
								/>
								<div className={`${showDefaultText ? "" : "hidden"} absolute inset-0 bg-white m-12 rounded-xl opacity-95 pt-[50%] px-8`} >
									<div className="text-black">
										{/* Card Name (Card Cost / Card Affiliation) */}
										<span className="font-bold text-center">
											{selectedCard.cardName}
										</span>{" "}
										(
										<span className="px-2 py-1 font-serif text-sm text-white bg-black rounded-full">
											{selectedCard.manaCost
												? selectedCard.manaCost
												: selectedCard.manaProduced
												? selectedCard.manaProduced
												: ""}
										</span>{" "}
										/{" "}
										{selectedCard.cardElement !==
											"Neutral" ||
										selectedCard.type !== "Territory"
											? getCardElementalAffiliationString(
													selectedCard.cardElementalAffiliation,
													selectedCard.elementID
											  )
											: ""}
										)
									</div>
									{/* Card Supertype, Type and Subtype
									 Ex: Legendary Water Unit - Dragon */}
									<div className="pb-4 text-sm font-medium">
										{selectedCard.superType}{" "}
										{selectedCard.cardElement}{" "}
										{selectedCard.type} -{" "}
										{selectedCard.subType}
									</div>
									<div className="text-sm font-normal">
										{processCardText(selectedCard.cardText)}
									</div>
									<div className="text-sm font-normal">
										{selectedCard.cardFlavorText}
									</div>
									<div className="pb-6 text-sm font-medium">
										{selectedCard.type === "Unit"
											? `Strength: ${selectedCard.strength} / Defense: ${selectedCard.defense}`
											: selectedCard.type === "Territory"
											? `Defense: ${selectedCard.territoryDefense}`
											: ""}
									</div>
									<div className="font-normal text-[10px]">
										{selectedCard.copyrightText}
									</div>
								</div>
							</div>
						<button
							className="text-white text-4xl col-span-1 md:col-span-1"
							onClick={handleForwardButtonClick}
							disabled={selectedCardIndex === cards.length - 1}
						>
							{forwardButton}
						</button>
						</div>
					</div>
				</div>
			)}
			<div className="flex flex-col items-center justify-center">
				<div className="w-full h-fit mb-12">
					<CardFilter
						cards={cards}
						onFilterChange={handleFilterChange}
					/>
				</div>
				<div className="grid grid-cols-1 gap-4 md:gap-8 mx-auto sm:grid-cols-2 lg:grid-cols-3">
					{filteredCards.map((card, index) => (
						<div key={index} className="m-8">
							<div className=" pb-4/3 bg-black cursor-pointer ">
								<img
									src={`/${card.imageUrl}`}
									className=" inset-0 w-full h-full object-cover object-center mb-4 rounded-xl"
									alt={`${card.imageAltText}`}
									onClick={() => openModal(index)}
									onError={(e) => {
										setShowDefaultText(true)
										e.target.src =
											"/assets/images/prime/card_images/card_back.jpg";
									}}
								/>
							</div>
							<div className="w-full  p-4 bg-white/95 rounded">
								<div className="text-black">
									{/* Card Name (Card Cost / Card Affiliation) */}
									<span className="font-bold text-center">
										{card.cardName}
									</span>{" "}
									(
									<span className="px-2 py-1 font-serif text-sm text-white bg-black rounded-full">
										{card.manaCost
											? card.manaCost
											: card.manaProduced
											? card.manaProduced
											: ""}
									</span>{" "}
									/{" "}
									{card.cardElement !== "Neutral" ||
									card.type !== "Territory"
										? getCardElementalAffiliationString(
												card.cardElementalAffiliation,
												card.elementID
										  )
										: ""}
									)
								</div>
								{/* Card Supertype, Type and Subtype
									 Ex: Legendary Water Unit - Dragon */}
								<div className="pb-4 text-sm font-medium">
									{card.superType} {card.cardElement}{" "}
									{card.type} - {card.subType}
								</div>
								<div className="text-sm font-normal">
									{processCardText(card.cardText)}
								</div>
								<div className="text-sm font-normal">
									{card.cardFlavorText}
								</div>
								<div className="pb-6 text-sm font-medium">
									{card.type === "Unit"
										? `Strength: ${card.strength} / Defense: ${card.defense}`
										: card.type === "Territory"
										? `Defense: ${card.territoryDefense}`
										: ""}
								</div>
								<div className="font-normal text-[10px]">
									{card.copyrightText}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

const CardFilter = ({ cards, onFilterChange }) => {
	// initialize search term to blank
	const [searchTerm, setSearchTerm] = useState("");
	//initialize the element filters to true
	const [elementFilters, setElementFilters] = useState({
		Earth: true,
		Air: true,
		Fire: true,
		Water: true,
		Light: true,
		Shadow: true,
		Neutral: true,
	});

	// useEffect(() => {
	// 	onFilterChange({ searchTerm, elementFilters })
	// }, [elementFilters, onFilterChange, searchTerm]);

	const handleSearchTermChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const handleElementFiltersChange = (event) => {
		const { checked } = event.target;
		const element = event.target.getAttribute("element");
		const newFilters = { ...elementFilters, [element]: checked };
		setElementFilters(newFilters);
		console.log("newFilters: ", newFilters);
		// onFilterChange({ searchTerm, newFilters });
		handleFilterSubmit(event);
	};

	const handleFilterSubmit = (event) => {
		event.preventDefault();
		console.log("filter submitted");
		console.log(
			"searchTerm:",
			searchTerm,
			"elementFilters:",
			elementFilters
		);
		onFilterChange({ searchTerm, elementFilters });
	};

	return (
		<div className="flex items-center align-middle justify-center">
			<form onSubmit={handleFilterSubmit}>
				<div className="w-full flex flex-col md:flex-row align-middle items-center mx-4 ">
					<input
						type="text"
						value={searchTerm}
						onChange={handleSearchTermChange}
						placeholder="Find a card by name, description, etc..."
						className="md:my-4 md:ml-4 md:mr-0 my-2 border-gray-300 px-2 py-2 w-8/12 md:w-8/12 md:mr-6 focus:border-gray-600 border-2 h-12 rounded "
					/>
					<button
						type="submit"
						className=" bg-red-500 w-8/12 md:w-3/12 h-12 px-4 rounded text-white font-bold text-xl mb-4 md:mt-4 md:ml-2 w-full"
					>
						Search
					</button>
				</div>
				{/* Had to look up object.keys -- needed to find the actual element
				names in the filters, not the values.
				https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys */}
				<div className="flex flex-row mx-4 mb-2 hidden">
					{Object.keys(elementFilters).map(
						(element) =>
							element && (
								<div
									key={element}
									className="flex flex-row align-middle items-center"
								>
									<input
										type="checkbox"
										element={element}
										checked={elementFilters[element]}
										onChange={handleElementFiltersChange}
										className="h-4 w-4 px-2"
									/>
									<span className="font-medium pl-1 pr-4 text-white">
										{element}
									</span>
								</div>
							)
					)}
				</div>
			</form>
		</div>
	);
};
