import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import { resettingScore } from '../redux/actions';
import styles from './Feedback.module.css';

class Feedback extends Component {
  componentDidMount() {
    const { score, imagem, name } = this.props;
    let rankingDB = JSON.parse(localStorage.getItem('ranking'));
    if (rankingDB === null) {
      rankingDB = [];
    }
    const ranking = {
      name,
      score,
      picture: imagem,
    };
    const sortedRanking = [...rankingDB, ranking];
    sortedRanking.sort(this.sortRanking);
    localStorage.setItem('ranking', JSON.stringify(sortedRanking));
  }

  sortRanking = (a, b) => {
    const NUMBER_ONE = 1;
    if (a.score > b.score) return -NUMBER_ONE;
    if (a.score < b.score) return 1;
    return 0;
  };

  checkCountOfCorretAnswer = () => {
    const { assertions } = this.props;
    const minCount = 3;
    if (assertions < minCount) return 'Poderia ser melhor...';
    return 'Mandou Bem!';
  };

  handleClickHome = (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    dispatch(resettingScore());
    history.push('/');
  };

  handleClickRanking = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        <section className={ styles.feedback }>
          <div className={ styles.mainFeedback }>
            {this.checkCountOfCorretAnswer()}

            <h2 data-testid="feedback-total-score">
              {`Um total de: ${score} pontos`}
            </h2>
            <h3 data-testid="feedback-total-question">
              {`Você acertou ${assertions} questões`}
            </h3>
            <button
              data-testid="btn-play-again"
              type="button"
              className={ styles.buttonPlayAgain }
              onClick={ this.handleClickHome }
            >
              Jogar novamente
            </button>
            <button
              data-testid="btn-ranking"
              type="submit"
              className={ styles.buttonRanking }
              onClick={ this.handleClickRanking }
            >
              Ranking
            </button>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  imagem: state.player.imagem,
  name: state.player.name,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  imagem: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Feedback);
