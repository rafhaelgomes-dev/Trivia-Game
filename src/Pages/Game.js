import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import AnswerButtons from '../Components/AnswerButtons';

class Game extends Component {
  constructor() {
    super();
    const number = 3;
    this.state = {
      index: 0,
      clickAnswer: false,
      seconds: 30,
      disabledButtonAnswers: false,
      respostasMulti: [],
      respostasBollen: [],
      multipleRandomArray: [1, 2, 0, number],
      booleanRandomArray: [0, 1],
    };
  }

  componentDidMount() {
    const { Results, history } = this.props;
    const responseCode = 3;
    if (Results.response_code === responseCode) {
      return history.push('/');
    }
    const oneSecond = 1000;
    this.intervalID = setInterval(async () => {
      const { seconds } = this.state;
      const timeLimit = 0;
      if (seconds === timeLimit) {
        this.setState({ disabledButtonAnswers: true });
      } else {
        this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
      }
    }, oneSecond);
    this.handleSetState();
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
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
    const number = 4;
    this.setState((prevState) => ({ index: prevState.index === number
      ? prevState.index : prevState.index + 1,
    clickAnswer: false,
    }), this.setState({ seconds: 30 }));
    this.handleSetState();
    // FUNÇÃO QUE REDIRECIONA PARA O FEEDBACK
    // const { index } = this.state;
    // if (index === number) {
    //   const { history } = this.props;
    //   history.push('/feedback');
    // }
  };

  handleSetState = () => {
    const { Results } = this.props;
    const { index, multipleRandomArray, booleanRandomArray } = this.state;
    const array = this.shuffleArray(multipleRandomArray);
    const array2 = this.shuffleArray(booleanRandomArray);
    const colorCorrectAnswer = '3px solid rgb(6, 240, 15';
    const colorWrongAnswer = '3px solid red';
    this.setState({
      respostasMulti: [
        {
          resposta: Results.results[index].correct_answer,
          dataTesting: 'correct-answer',
          color: colorCorrectAnswer,
        },
        {
          resposta: Results.results[index].incorrect_answers[0],
          dataTesting: 'wrong-answer-0',
          color: colorWrongAnswer,
        },
        {
          resposta: Results.results[index].incorrect_answers[1],
          dataTesting: 'wrong-answer-1',
          color: colorWrongAnswer,
        },
        {
          resposta: Results.results[index].incorrect_answers[2],
          dataTesting: 'wrong-answer-2',
          color: colorWrongAnswer,
        },
      ],
      respostasBollen: [
        {
          resposta: Results.results[index].correct_answer,
          dataTesting: 'correct-answer',
          color: colorCorrectAnswer,
        },
        {
          resposta: Results.results[index].incorrect_answers[0],
          dataTesting: 'wrong-answer-0',
          color: colorWrongAnswer,
        },
      ],
      multipleRandomArray: array,
      booleanRandomArray: array2,
    });
  };

  handleColor = () => {
    this.setState({
      clickAnswer: true,
    });
  };

  render() {
    const { Results } = this.props;
    const { index,
      clickAnswer,
      disabledButtonAnswers,
      seconds, respostasBollen, respostasMulti,
      multipleRandomArray, booleanRandomArray } = this.state;
    const color = '3px solid rgb(6, 240, 15';
    if
    (Results === undefined
    || respostasMulti.length === 0 || respostasBollen.length === 0) {
      return <p>Carregando</p>;
    }
    return (
      <section>
        <Header />
        <div>
          <AnswerButtons
            Results={ Results }
            index={ index }
            disabledButtonAnswers={ disabledButtonAnswers }
            respostasMulti={ respostasMulti }
            color={ color }
            handleColor={ this.handleColor }
            respostasBollen={ respostasBollen }
            clickAnswer={ clickAnswer }
            multipleRandomArray={ multipleRandomArray }
            booleanRandomArray={ booleanRandomArray }
          />
          {clickAnswer && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleIncrementIndex }
            >
              Next
            </button>
          )}
          <h2>{ seconds }</h2>
        </div>
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
