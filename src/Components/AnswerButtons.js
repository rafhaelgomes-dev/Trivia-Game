import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeScore } from '../redux/actions';

const NUMBER_THREE = 3;
const NUMBER_TEN = 10;
const ZERO = 0;

class AnswerButtons extends Component {
  // state = {
  //   score: 0,
  // };
  handleClick = ({ target }) => {
    const { handleColor, dispatch, Results, index, seconds } = this.props;
    const { results } = Results;
    handleColor();

    if (target.name === 'easy') {
      const easy = NUMBER_TEN + (seconds * 1);

      return results[index].correct_answer === target.textContent
        ? dispatch(changeScore(easy))
        : dispatch(changeScore(ZERO));
    }
    if (target.name === 'medium') {
      const medium = NUMBER_TEN + (seconds * 2);

      return results[index].correct_answer === target.textContent
        ? dispatch(changeScore(medium))
        : dispatch(changeScore(ZERO));
    }
    if (target.name === 'hard') {
      const hard = NUMBER_TEN + (seconds * NUMBER_THREE);

      return results[index].correct_answer === target.textContent
        ? dispatch(changeScore(hard))
        : dispatch(changeScore(ZERO));
    }
  };
  // handleClick = ({ target }) => {
  //   const { handleColor, dispatch, Results, index, seconds } = this.props;
  //   const { score } = this.state;
  //   const { results } = Results;
  //   handleColor();
  //   console.log('difficult', target.name);
  //   console.log('difficult', target.value);
  //   console.log('texto botão(resposta)', target.innerHTML);
  //   console.log('Resposta da API', results[index].correct_answer);

  //   if (target.name === 'easy') {
  //     const easy = NUMBER_TEN + (seconds * 1);
  //     const result = results[index].correct_answer
  //     === target.innerHTML ? easy : ZERO;

  //     this.setState(
  //       (prevState) => ({ score: prevState.score + result }),
  //       () => dispatch(changeScore(score)),
  //     );
  //   }
  //   if (target.name === 'medium') {
  //     const medium = NUMBER_TEN + (seconds * 2);
  //     const result = results[index].correct_answer
  //     === target.innerHTML ? medium : ZERO;

  //     this.setState(
  //       (prevState) => ({ score: prevState.score + result }),
  //       () => dispatch(changeScore(score)),
  //     );
  //   }
  //   if (target.name === 'hard') {
  //     const hard = NUMBER_TEN + (seconds * NUMBER_THREE);
  //     const result = results[index].correct_answer
  //     === target.innerHTML ? hard : ZERO;

  //     this.setState(
  //       (prevState) => ({ score: prevState.score + result }),
  //       () => dispatch(changeScore(score)),
  //     );
  //   }
  // };
  // handleClick = ({ target }) => {
  //   const { handleColor,
  //     dispatch,
  //     Results,
  //     index,
  //     seconds,
  //   } = this.props;
  //   const { results } = Results;
  //   const difficults = { easy: 1, medium: 2, hard: 3 };
  //   console.log('Resposta correta', results[index].correct_answer);
  //   console.log('Resposta clicada', target.name);

  //   handleColor();

  //   if (results[index].correct_answer === target.name) {
  //     const easy = NUMBER_TEN + (seconds * difficults[results[index].difficulty]);
  //     dispatch(changeScore(easy));
  //   }
  //   if (results[index].correct_answer === target.name) {
  //     const medium = NUMBER_TEN + (seconds * difficults[results[index].difficulty]);
  //     dispatch(changeScore(medium));
  //   }
  //   if (results[index].correct_answer === target.name) {
  //     const hard = NUMBER_TEN + (seconds * difficults[results[index].difficulty]);
  //     dispatch(changeScore(hard));
  //   }
  //   dispatch(changeScore(ZERO));
  // };

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
