import React, { Component } from "react";
import axios from "axios";

export default class Game extends Component {
	constructor() {
		super();

		this.state = {
			score: 0,
			gameNumber: 1,
			cards: [],
			clicked: false,
			id: 0,
		};

		this.getCards = this.getCards.bind(this);
		this.mapCards = this.mapCards.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.componentRef = React.createRef();
	}

	handleClick(id) {
		document.getElementById;
		this.setState({
			clicked: !this.state.clicked,
		});
	}

	mapCards() {
		return this.state.cards.map((card) => {
			return (
				<div className="card" key={card.id}>
					<button onClick={() => this.handleClick()}>
						{this.state.clicked ? (
							<img id={card.id} className="card-front" src={card.front} />
						) : (
							<img id={card.id} className="card-back" src={card.back} />
						)}
					</button>
				</div>
			);
		});
	}

	getCards() {
		axios.get("http://127.0.0.1:5000/card/get").then((res) => {
			this.setState({
				cards: res.data,
			}).catch((err) => {
				console.log(err);
			});
		});
	}

	componentDidMount() {
		this.getCards();
	}

	render() {
		return <div className="game-wrapper">{this.mapCards()}</div>;
	}
}
