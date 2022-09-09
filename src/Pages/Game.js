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
      botoesOrdemAtual: undefined,
      botoesOrdemAtual2: undefined,
    };
  }

  componentDidMount() {
    const { Results, history } = this.props;
    const responseCode = 3;
    if (Results.response_code === responseCode) {
      return history.push('/');
    }
    const array = this.shuffleArray();
    this.setState({
      botoesOrdemAtual: array,
    });
  }

  shuffleArray = () => {
    const { index, clickAnswer } = this.state;
    const colorWrongAnswer = '3px solid red';
    const colorCorrectAnswer = '3px solid rgb(6, 240, 15)';
    const { Results } = this.props;
    if (Results.results[index].incorrect_answers.length === 1) {
      console.log(Results.results[index].incorrect_answers.length);
      const array = this.shuffleArray2();
      console.log(array);
      this.setState({
        botoesOrdemAtual2: array,
      });
    }
    const array = [
      <button
        type="button"
        key="0"
        data-testid="correct-answer"
        style={ clickAnswer ? { border: colorCorrectAnswer } : null }
        onClick={ this.handleColor }
      >
        {Results.results[index].correct_answer}

      </button>,
      <button
        type="button"
        key="1"
        data-testid="wrong-answer-0"
        style={ clickAnswer ? { border: colorWrongAnswer } : null }
        onClick={ this.handleColor }
      >
        {Results.results[index].incorrect_answers[0]}
      </button>,
      <button
        type="button"
        key="2"
        data-testid="wrong-answer-1"
        style={ clickAnswer ? { border: colorWrongAnswer } : null }
        onClick={ this.handleColor }
      >
        {Results.results[index].incorrect_answers[1]}

      </button>,
      <button
        type="button"
        key="3"
        data-testid="wrong-answer-2"
        style={ clickAnswer ? { border: colorWrongAnswer } : null }
        onClick={ this.handleColor }
      >
        {Results.results[index].incorrect_answers[2]}

      </button>,
    ];
    for (let i = array.length - 1; i > 0; i -= 1) {
      // Generate random number
      const j = Math.floor(Math.random() * (i + 1));

      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  shuffleArray2 = () => {
    const { index, clickAnswer } = this.state;
    const colorWrongAnswer = '3px solid red';
    const colorCorrectAnswer = '3px solid rgb(6, 240, 15)';
    const { Results } = this.props;
    const array = [
      <button
        type="button"
        key="0"
        data-testid="correct-answer"
        style={ clickAnswer ? { border: colorCorrectAnswer } : null }
        onClick={ this.handleColor }
      >
        {Results.results[index].correct_answer}

      </button>,
      <button
        type="button"
        key="1"
        data-testid="wrong-answer-0"
        style={ clickAnswer ? { border: colorWrongAnswer } : null }
        onClick={ this.handleColor }
      >
        {Results.results[index].incorrect_answers[0]}
      </button>,
    ];
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
    const array = this.shuffleArray();
    this.setState({
      botoesOrdemAtual: array,
    });

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
    });
  };

  render() {
    const { Results } = this.props;
    const { index, clickAnswer, botoesOrdemAtual, botoesOrdemAtual2 } = this.state;
    const responseCode = 3;
    if (botoesOrdemAtual === undefined) {
      return <p>Carregando</p>;
    }
    return (
      <section>
        <Header />
        <div>
          {Results.response_code !== responseCode && (
            Results.results[index].type === 'multiple'
              ? (
                <div data-testid="answer-options">
                  <p data-testid="question-category">{Results.results[index].category}</p>
                  <p data-testid="question-text">{Results.results[index].question}</p>
                  {botoesOrdemAtual[0]}
                  {botoesOrdemAtual[1]}
                  {botoesOrdemAtual[2]}
                  {botoesOrdemAtual[3]}
                </div>
              ) : (
                (
                  <div data-testid="answer-options">
                    <p
                      data-testid="question-category"
                    >
                      {Results.results[index].category}

                    </p>
                    <p data-testid="question-text">{Results.results[index].question}</p>
                    {botoesOrdemAtual2[0]}
                    {botoesOrdemAtual2[1]}
                  </div>
                )
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
