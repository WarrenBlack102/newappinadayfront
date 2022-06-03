import React, { Component } from "react";
import Game from "./game";
import Header from "./header";
import Footer from "./footer";

export default class App extends Component {
	render() {
		return (
			<div className="app">
				<Header />
				<Game />
				<Footer />
			</div>
		);
	}
}
