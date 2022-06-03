import React, { Component } from "react";
import axios from "axios";

export default class Game extends Component {
	constructor() {
		super();

		this.state = {
			score: 0,
			gameNumber: 1,
			cards: [],
			1: false,
			2: false,
			3: false,
			4: false,
			5: false,
			6: false,
			7: false,
			8: false,
			9: false,
			10: false,
			11: false,
			12: false,
			card1: "",
			card2: "",
		};

		this.getCards = this.getCards.bind(this);
		this.mapCards = this.mapCards.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.mapCards2 = this.mapCards2.bind(this);
	}

	handleClick(card) {
		let counter = 0;
		this.setState({
			[card.id]: !this.state[id],
		});
		if (counter % 2 == 0) {
			counter = counter + 1;
			this.setState({
				card1: card.front,
			});
		}
	}

	mapCards() {
		return this.state.cards.map((card) => {
			return (
				<div className="card" key={card.id}>
					<button onClick={() => this.handleClick(card)}>
						{this.state[card.id] == false ? (
							<img id={card.id} className="card-back" src={card.back} />
						) : (
							<img id={card.id} className="card-front" src={card.front} />
						)}
					</button>
				</div>
			);
		});
	}

	mapCards2() {
		return this.state.cards.map((card) => {
			return (
				<div className="card" key={card.id + 6}>
					<button onClick={() => this.handleClick(card.id + 6)}>
						{this.state[card.id + 6] == false ? (
							<img id={card.id} className="card-back" src={card.back} />
						) : (
							<img id={card.id} className="card-front" src={card.front} />
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
		return (
			<div className="game-wrapper">
				{this.mapCards()}
				{this.mapCards2()}
			</div>
		);
	}
}
