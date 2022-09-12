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
};

export default connect(mapStateToProps)(Feedback);
