import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeScore, counter } from '../redux/actions';
import styles from '../Pages/Game.module.css';

const NUMBER_THREE = 3;
const NUMBER_TEN = 10;
const ZERO = 0;

class AnswerButtons extends Component {
  state = {
    assertions: 0,
  };

  decodeEntity = (inputStr) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = inputStr;
    return textarea.value;
  };

  handleClick = async ({ target }) => {
    const { handleColor, dispatch, Results, index, seconds } = this.props;
    const { results } = Results;
    handleColor();
    if (target.name === 'easy') {
      const easy = NUMBER_TEN + (seconds * 1);
      if (results[index].correct_answer === target.textContent) {
        await dispatch(changeScore(easy));
        await this.setState((prevState) => (
          { assertions: prevState.assertions + 1 }), () => {
          const { assertions } = this.state;
          dispatch(counter(assertions));
        });
      } else await dispatch(changeScore(ZERO));
    }
    if (target.name === 'medium') {
      const medium = NUMBER_TEN + (seconds * 2);

      if (results[index].correct_answer === target.textContent) {
        await dispatch(changeScore(medium));
        await this.setState((prevState) => (
          { assertions: prevState.assertions + 1 }), () => {
          const { assertions } = this.state;
          dispatch(counter(assertions));
        });
      } else await dispatch(changeScore(ZERO));
    }
    if (target.name === 'hard') {
      const hard = NUMBER_TEN + (seconds * NUMBER_THREE);

      if (results[index].correct_answer === target.textContent) {
        await dispatch(changeScore(hard));
        await this.setState((prevState) => (
          { assertions: prevState.assertions + 1 }), () => {
          const { assertions } = this.state;
          dispatch(counter(assertions));
        });
      } else await ispatch(changeScore(ZERO));
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
      <section className={ styles.componentAnswer }>
        {results[index].type === 'multiple' ? (
          <div className={ styles.answerDiv }>
            <div className={ styles.Containerperguntas }>
              <p
                className={ styles.category }
              >
                { this.decodeEntity(results[index].category) }

              </p>
              <p>{ this.decodeEntity(results[index].question) }</p>
            </div>
            <div className={ styles.containerButton }>
              {indexArrMulti.map((item) => (
                <button
                  className={ styles.buttonRespostas }
                  key={ item }
                  type="button"
                  name={ results[item].difficulty }
                  data-testid={ respostasMulti[multipleRandomArray[item]].dataTesting }
                  style={ clickAnswer
                    ? { border: respostasMulti[multipleRandomArray[item]].color } : null }
                  disabled={ disabledButtonAnswers }
                  onClick={ this.handleClick }
                >
                  { this.decodeEntity(
                    respostasMulti[multipleRandomArray[item]].resposta,
                  ) }
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={ styles.answerDiv }>
            <div className={ styles.Containerperguntas }>
              <p
                className={ styles.category }
              >
                { this.decodeEntity(results[index].category) }
              </p>

              <p>{ this.decodeEntity(results[index].question) }</p>
            </div>
            <div className={ styles.containerButton }>
              {indexArrDuo.map((item) => (
                <button
                  className={ styles.buttonRespostas }
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
