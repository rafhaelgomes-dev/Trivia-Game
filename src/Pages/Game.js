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
      seconds: 30,
      disabledButtonAnswers: false,
    };
  }

  componentDidMount() {
      const { Results, history } = this.props;
      const responseCode = 3;
      if (Results.response_code === responseCode) {
        return history.push('/');
      }

      const oneSecond= 1000;
      this.intervalID = setInterval(() => {
        const {seconds} = this.state;
        const timeLimit = 0
        if(seconds === timeLimit) {
          this.setState ({ disabledButtonAnswers: true })
        } else { 
          this.setState((prevState) => ({ seconds: prevState.seconds - 1 }) );
      }
   }, oneSecond);
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

  handleIncrementIndex = async () => {
    const number = 4;
    await this.setState((prevState) => ({ index: prevState.index === number
      ? prevState.index : prevState.index + 1,
    clickAnswer: false,
    }));

    // FUNÇÃO QUE REDIRECIONA PARA O FEEDBACK
    // const { index } = this.state;
    // if (index === number) {
    //   const { history } = this.props;
    //   history.push('/feedback');
    // }
  };

  handleColor = () => {
    this.setState({
      clickAnswer: true,
      disabledButtonAnswers: true,
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

    const { index, seconds, clickAnswer } = this.state;
    
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
          {clickAnswer && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleIncrementIndex }
            >
              Next
            </button>
          )}
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
