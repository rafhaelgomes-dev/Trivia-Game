import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';

class Feedback extends Component {
  checkCountOfCorretAnswer = () => {
    const { count } = this.props;
    const minCount = 3;
    if (count < minCount) return 'Could be better...';
    return 'Well Done!';
  };

  render() {
    return (
      <div data-testid="feedback-text">
        Feedback
        <Header />
        <section data-testid="feedback-text">
          {this.checkCountOfCorretAnswer()}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  count: state.player.count,
});

Feedback.propTypes = {
  count: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
