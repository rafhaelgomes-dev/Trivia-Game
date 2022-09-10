import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AnswerButtons extends Component {
  render() {
    const { Results,
      index, respostasMulti,
      respostasBollen,
      disabledButtonAnswers,
      handleColor, clickAnswer, multipleRandomArray, booleanRandomArray } = this.props;
    return (
      <section>
        {Results.results[index].type === 'multiple' ? (
          <div data-testid="answer-options">
            <p data-testid="question-category">{Results.results[index].category}</p>
            <p data-testid="question-text">{Results.results[index].question}</p>
            <button
              type="button"
              data-testid={ respostasMulti[multipleRandomArray[0]].dataTesting }
              style={ clickAnswer
                ? { border: respostasMulti[multipleRandomArray[0]].color } : null }
              disabled={ disabledButtonAnswers }
              onClick={ handleColor }
            >
              {respostasMulti[multipleRandomArray[0]].resposta}

            </button>
            <button
              type="button"
              data-testid={ respostasMulti[multipleRandomArray[1]].dataTesting }
              style={ clickAnswer
                ? { border: respostasMulti[multipleRandomArray[1]].color } : null }
              disabled={ disabledButtonAnswers }
              onClick={ handleColor }
            >
              {respostasMulti[multipleRandomArray[1]].resposta}
            </button>
            <button
              type="button"
              data-testid={ respostasMulti[multipleRandomArray[2]].dataTesting }
              style={ clickAnswer
                ? { border: respostasMulti[multipleRandomArray[2]].color } : null }
              disabled={ disabledButtonAnswers }
              onClick={ handleColor }
            >
              {respostasMulti[multipleRandomArray[2]].resposta}

            </button>
            <button
              type="button"
              data-testid={ respostasMulti[multipleRandomArray[3]].dataTesting }
              style={ clickAnswer
                ? { border: respostasMulti[multipleRandomArray[3]].color } : null }
              disabled={ disabledButtonAnswers }
              onClick={ handleColor }
            >
              {respostasMulti[multipleRandomArray[3]].resposta}

            </button>
          </div>
        ) : (
          <div data-testid="answer-options">
            <p
              data-testid="question-category"
            >
              {Results.results[index].category}

            </p>
            <p data-testid="question-text">{Results.results[index].question}</p>
            <button
              type="button"
              data-testid={ respostasMulti[booleanRandomArray[0]].dataTesting }
              style={ clickAnswer
                ? { border: respostasMulti[booleanRandomArray[0]].color } : null }
              disabled={ disabledButtonAnswers }
              onClick={ handleColor }
            >
              {respostasBollen[booleanRandomArray[0]].resposta}

            </button>
            <button
              type="button"
              data-testid={ respostasMulti[booleanRandomArray[1]].dataTesting }
              style={ clickAnswer
                ? { border: respostasMulti[booleanRandomArray[1]].color } : null }
              disabled={ disabledButtonAnswers }
              onClick={ handleColor }
            >
              {respostasBollen[booleanRandomArray[1]].resposta}
            </button>
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
