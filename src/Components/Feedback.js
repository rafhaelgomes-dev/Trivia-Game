import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';

class Feedback extends Component {
  checkCountOfCorretAnswer = () => {
    const { assertions } = this.props;
    const minCount = 3;
    if (assertions < minCount) return 'Could be better...';
    return 'Well Done!';
  };

  handleClickHome = (event) => {
    event.preventDefault();
    const { history } = this.props;
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
      <div data-testid="feedback-text">
        Feedback
        <Header />
        <section data-testid="feedback-text">
          {this.checkCountOfCorretAnswer()}
        </section>
        <h2 data-testid="feedback-total-score">
          { score }
        </h2>
        <h2 data-testid="feedback-total-question">
          { assertions }
        </h2>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.handleClickHome }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          type="submit"
          onClick={ this.handleClickRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
