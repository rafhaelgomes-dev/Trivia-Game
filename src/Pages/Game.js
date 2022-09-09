import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      clickAnswer: false,
      seconds: 5,
      disabledButtonAnswers: false,
    };
  }

  componentDidMount() {
    const { Results, history } = this.props;
    const responseCode = 3;
    if (Results.response_code === responseCode) {
      return history.push('/');
    }

    const ONE_SECOND = 1000;

      this.intervalID = setInterval(() => {
        this.setState((prevState) => ({ seconds: prevState.seconds - 1 }) );
      }, ONE_SECOND);
    }
  
  componentDidUpdate() {
  
    const { seconds } = this.state;
    const TIME_LIMIT = 0;
    
    if (seconds === TIME_LIMIT) {
       clearInterval(this.intervalID);

      //  this.setState ({ disabledButtonAnswers: true })
      

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

  // handleIncrementIndex = () => {
  //   const number = 4;
  //   this.setState((prevState) => ({ index: prevState.index === number
  //     ? prevState.index : prevState.index + 1 }));
  // };

  handleColor = () => {
    this.setState({
      clickAnswer: true,
    });
  };

  handlMultipleQuestions = () => {
    const { Results } = this.props;
    const { index, clickAnswer, disabledButtonAnswers } = this.state;
    const colorWrongAnswer = '3px solid red';
    const colorCorrectAnswer = '3px solid rgb(6, 240, 15)';
    const botoes = [
      <button
        type="button"
        key="0"
        data-testid="correct-answer"
        style={ clickAnswer ? { border: colorCorrectAnswer } : null }
        disabled ={ disabledButtonAnswers }
        onClick={ this.handleColor }
      >
        {Results.results[index].correct_answer}

      </button>,
      <button
        type="button"
        key="1"
        data-testid="wrong-answer-0"
        style={ clickAnswer ? { border: colorWrongAnswer } : null }
        disabled ={ disabledButtonAnswers }
        onClick={ this.handleColor }
      >
        {Results.results[index].incorrect_answers[0]}
      </button>,
      <button
        type="button"
        key="2"
        data-testid="wrong-answer-1"
        style={ clickAnswer ? { border: colorWrongAnswer } : null }
        disabled ={ disabledButtonAnswers }
        onClick={ this.handleColor }
      >
        {Results.results[index].incorrect_answers[1]}

      </button>,
      <button
        type="button"
        key="3"
        data-testid="wrong-answer-2"
        style={ clickAnswer ? { border: colorWrongAnswer } : null }
        disabled ={ disabledButtonAnswers }
        onClick={ this.handleColor }
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
    const { index, clickAnswer, disabledButtonAnswers } = this.state;
    const colorWrongAnswer = '3px solid red';
    const colorCorrectAnswer = '3px solid rgb(6, 240, 15)';
    const botoes = [
      <button
        type="button"
        key="0"
        data-testid="correct-answer"
        style={ clickAnswer ? { border: colorCorrectAnswer } : null }
        disabled ={ disabledButtonAnswers }
        onClick={ this.handleColor }
      >
        {Results.results[index].correct_answer}

      </button>,
      <button
        type="button"
        key="1"
        data-testid="wrong-answer-0"
        style={ clickAnswer ? { border: colorWrongAnswer } : null }
        disabled ={ disabledButtonAnswers }
        onClick={ this.handleColor }
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
    const { index, seconds } = this.state;
    const responseCode = 3;
    return (
      <section>
        <Header />
        <div>
          {Results.response_code !== responseCode && (
            Results.results[index].type === 'multiple'
              ? this.handlMultipleQuestions() : (
                this.handleBooleanQuestions()
              ))}
        </div>
        <h2>{ seconds }</h2>
      </section>
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
