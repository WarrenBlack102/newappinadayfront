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
      card1: [],
      card2: [],
      counter: 0,
    };

    this.getCards = this.getCards.bind(this);
    this.mapCards = this.mapCards.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.mapCards2 = this.mapCards2.bind(this);
    this.handleMatch = this.handleMatch.bind(this);
    this.checkMatch = this.checkMatch.bind(this);
    this.removeMatches = this.removeMatches.bind(this);
  }

  removeMatches(card1, card2) {
    if (this.state(card1.front, card2.front) == true) {
      this.setState({
        cards: this.state.cards.filter(card1, (card2) => {
          return card.id != card1.id && card2.id;
        }),
      });
    }
  }

  handleClick(id) {
    this.setState({
      [id]: !this.state[id],
    });
  }

  checkMatch(card1, card2) {
    console.log(card1, card2);
    if (
      this.state.card1 != [] &&
      this.state.card2 != [] &&
      this.state.card1.front == this.state.card2.front
    ) {
      card1.matched = true;
      card2.matched = true;
      this.setState({
        [card1.id]: false,
        [card2.id + 6]: false,
        score: this.state.score + 1,
        card1: [],
        card2: [],
      });
      this.removeMatches(card1, card2);
    } else if (
      this.state.card1 != [] &&
      this.state.card2 != [] &&
      this.state.card1 != this.state.card2
    ) {
      this.setState({
        [card1.id]: false,
        [card2.id + 6]: false,
      });
    } else if (this.state.card1 == [] && this.state.card2 == []) {
      this.setState({
        [card1.id]: false,
        [card2.id + 6]: false,
      });
    }
  }

  handleMatch(card) {
    let card1 = [];
    let card2 = [];
    if (this.state.counter % 2 != 0) {
      card1 = card;
    } else {
      card2 = card;
    }
    if (this.state.counter % 2 == 0) {
      this.setState({
        card1: card,
        counter: this.state.counter + 1,
      });
    } else {
      this.setState({
        card2: card,
        counter: this.state.counter + 1,
      });
    }
    setTimeout(() => {
      this.checkMatch(card1, card2);
    }, 10);
  }

  mapCards() {
    return this.state.cards.map((card) => {
      card["matched"] = false;
      return (
        <div className="card" key={card.id}>
          {card.matched == false ? (
            <button
              onClick={() => {
                this.handleClick(card.id);
                this.handleMatch(card);
              }}
            >
              {this.state[card.id] === false ? (
                <img id={card.id} className="card-back" src={card.back} />
              ) : (
                <img id={card.id} className="card-front" src={card.front} />
              )}
            </button>
          ) : (
            <div></div>
          )}
        </div>
      );
    });
  }

  mapCards2() {
    return this.state.cards.map((card) => {
      card["matched"] = false;
      return (
        <div className="card" key={card.id + 6}>
          {card.matched == false ? (
            <button
              onClick={() => {
                this.handleClick(card.id + 6);
                this.handleMatch(card);
              }}
            >
              {card.matched == false && this.state[card.id + 6] == false ? (
                <img id={card.id} className="card-back" src={card.back} />
              ) : (
                <img id={card.id} className="card-front" src={card.front} />
              )}
            </button>
          ) : (
            <div></div>
          )}
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
