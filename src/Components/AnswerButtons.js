import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AnswerButtons extends Component {
  render() {
    const { Results,
      index,
      respostasMulti,
      respostasBollen,
      disabledButtonAnswers,
      handleColor,
      clickAnswer,
      multipleRandomArray,
      booleanRandomArray,
    } = this.props;

    const NUMBER_THREE = 3;
    const indexArrMulti = [0, 1, 2, NUMBER_THREE];
    const indexArrDuo = [0, 1];

    return (
      <section>
        {Results.results[index].type === 'multiple' ? (
          <div data-testid="answer-options">
            <p data-testid="question-category">{Results.results[index].category}</p>
            <p data-testid="question-text">{Results.results[index].question}</p>
            {indexArrMulti.map((item) => (
              <button
                key={ item }
                type="button"
                data-testid={ respostasMulti[multipleRandomArray[item]].dataTesting }
                style={ clickAnswer
                  ? { border: respostasMulti[multipleRandomArray[item]].color } : null }
                disabled={ disabledButtonAnswers }
                onClick={ handleColor }
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
              {Results.results[index].category}
            </p>

            <p data-testid="question-text">{Results.results[index].question}</p>
            {indexArrDuo.map((item) => (
              <button
                key={ item }
                type="button"
                data-testid={ respostasMulti[booleanRandomArray[item]].dataTesting }
                style={ clickAnswer
                  ? { border: respostasMulti[booleanRandomArray[item]].color } : null }
                disabled={ disabledButtonAnswers }
                onClick={ handleColor }
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
};

export default AnswerButtons;
