import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
  }

  componentDidMount() {
    const { Results, history } = this.props;
    const responseCode = 3;
    if (Results.response_code === responseCode) {
      return history.push('/');
    }
  }

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      // Generate random number
      const j = Math.floor(Math.random() * (i + 1));

      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  };

  handleIncrementIndex = () => {
    this.setState((prevState) => ({ index: prevState.index + 1 }));
  };

  handlMultipleQuestions = () => {
    const { Results } = this.props;
    const { index } = this.state;
    const botoes = [
      <button
        type="button"
        key="0"
        data-testid="correct-answer"
        onClick={ this.handleIncrementIndex }
      >
        {Results.results[index].correct_answer}

      </button>,
      <button
        type="button"
        key="1"
        data-testid="wrong-answer-0"
        onClick={ this.handleIncrementIndex }
      >
        {Results.results[index].incorrect_answers[0]}

      </button>,
      <button
        type="button"
        key="2"
        data-testid="wrong-answer-1"
        onClick={ this.handleIncrementIndex }
      >
        {Results.results[index].incorrect_answers[1]}

      </button>,
      <button
        type="button"
        key="3"
        data-testid="wrong-answer-2"
        onClick={ this.handleIncrementIndex }
      >
        {Results.results[index].incorrect_answers[2]}

      </button>,
    ];
    const arrVirado = this.shuffleArray(botoes);
    return (
      <div data-testid="answer-options">
        <p data-testid="question-category">{Results.results[index].category}</p>
        <p data-testid="question-text">{Results.results[index].question}</p>
        {arrVirado[0]}
        {arrVirado[1]}
        {arrVirado[2]}
        {arrVirado[3]}
      </div>
    );
  };

  handleBooleanQuestions = () => {
    const { Results } = this.props;
    const { index } = this.state;
    const botoes = [
      <button
        type="button"
        key="0"
        data-testid="correct-answer"
        onClick={ this.handleIncrementIndex }
      >
        {Results.results[index].correct_answer}

      </button>,
      <button
        type="button"
        key="1"
        data-testid="wrong-answer-0"
        onClick={ this.handleIncrementIndex }
      >
        {Results.results[index].incorrect_answers[0]}

      </button>,
    ];
    const arrVirado = this.shuffleArray(botoes);
    return (
      <div data-testid="answer-options">
        <p data-testid="question-category">{Results.results[index].category}</p>
        <p data-testid="question-text">{Results.results[index].question}</p>
        {arrVirado[0]}
        {arrVirado[1]}
      </div>
    );
  };

  render() {
    const { Results } = this.props;
    const { index } = this.state;
    const responseCode = 3;
    return (
      <div>
        {Results.response_code !== responseCode && (
          Results.results[index].type === 'multiple'
            ? this.handlMultipleQuestions() : (
              this.handleBooleanQuestions()
            ))}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  Results: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  Results: state.user.results,
  Token: state.user.token,
});

export default connect(mapStateToProps, null)(Game);
