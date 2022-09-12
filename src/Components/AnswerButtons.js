import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeScore, counter } from '../redux/actions';

const NUMBER_THREE = 3;
const NUMBER_TEN = 10;
const ZERO = 0;

class AnswerButtons extends Component {
  state = {
    assertions: 0,
  };

  handleClick = ({ target }) => {
    const { handleColor, dispatch, Results, index, seconds } = this.props;
    const { results } = Results;
    handleColor();

    if (target.name === 'easy') {
      const easy = NUMBER_TEN + (seconds * 1);

      if (results[index].correct_answer === target.textContent) {
        dispatch(changeScore(easy));
        this.setState((prevState) => ({ assertions: prevState.assertions + 1 }), () => {
          const { assertions } = this.state;
          dispatch(counter(assertions));
        });
      } else dispatch(changeScore(ZERO));
    }
    if (target.name === 'medium') {
      const medium = NUMBER_TEN + (seconds * 2);

      if (results[index].correct_answer === target.textContent) {
        dispatch(changeScore(medium));
        this.setState((prevState) => ({ assertions: prevState.assertions + 1 }), () => {
          const { assertions } = this.state;
          dispatch(counter(assertions));
        });
      } else dispatch(changeScore(ZERO));
    }
    if (target.name === 'hard') {
      const hard = NUMBER_TEN + (seconds * NUMBER_THREE);

      if (results[index].correct_answer === target.textContent) {
        dispatch(changeScore(hard));
        this.setState((prevState) => ({ assertions: prevState.assertions + 1 }), () => {
          const { assertions } = this.state;
          dispatch(counter(assertions));
        });
      } else dispatch(changeScore(ZERO));
    }
  };

  render() {
    const { Results,
      index,
      respostasMulti,
      respostasBollen,
      disabledButtonAnswers,
      clickAnswer,
      multipleRandomArray,
      booleanRandomArray,
    } = this.props;

    const { results } = Results;
    const indexArrMulti = [0, 1, 2, NUMBER_THREE];
    const indexArrDuo = [0, 1];

    return (
      <section>
        {results[index].type === 'multiple' ? (
          <div data-testid="answer-options">
            <p data-testid="question-category">{results[index].category}</p>
            <p data-testid="question-text">{results[index].question}</p>
            {indexArrMulti.map((item) => (
              <button
                key={ item }
                type="button"
                name={ results[item].difficulty }
                data-testid={ respostasMulti[multipleRandomArray[item]].dataTesting }
                style={ clickAnswer
                  ? { border: respostasMulti[multipleRandomArray[item]].color } : null }
                disabled={ disabledButtonAnswers }
                onClick={ this.handleClick }
              >
                {respostasMulti[multipleRandomArray[item]].resposta}
              </button>
            ))}

          </div>
        ) : (
          <div data-testid="answer-options">
            <p
              data-testid="question-category"
            >
              {results[index].category}
            </p>

            <p data-testid="question-text">{results[index].question}</p>
            {indexArrDuo.map((item) => (
              <button
                key={ item }
                type="button"
                name={ results[item].difficulty }
                data-testid={ respostasMulti[booleanRandomArray[item]].dataTesting }
                style={ clickAnswer
                  ? { border: respostasMulti[booleanRandomArray[item]].color } : null }
                disabled={ disabledButtonAnswers }
                onClick={ this.handleClick }
              >
                {respostasBollen[booleanRandomArray[item]].resposta}
              </button>
            ))}
          </div>
        )}
      </section>
    );
  }
}

AnswerButtons.propTypes = {
  Results: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  respostasMulti: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  respostasBollen: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  disabledButtonAnswers: PropTypes.bool.isRequired,
  multipleRandomArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  booleanRandomArray: PropTypes.arrayOf(PropTypes.number).isRequired,
  clickAnswer: PropTypes.bool.isRequired,
  handleColor: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  seconds: PropTypes.number.isRequired,
};

export default connect()(AnswerButtons);
