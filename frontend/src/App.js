import "./App.css";
import CardDatabase from "./CardDatabase";
import NavBar from "./NavBar";
import React, {
	useState,
	useEffect,
	Component,
	componentDidMount,
} from "react";
import { CardProvider } from "./context/CardContext";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.connectToServer = this.connectToServer.bind(this);
	}
	componentDidMount() {
		this.connectToServer();
	}

	connectToServer() {
		fetch("/");
	}

	render() {
		return (
			<React.Fragment>
				<CardProvider>
					<NavBar />
					<CardDatabase />
				</CardProvider>
			</React.Fragment>
		);
	}
}

export default App;
