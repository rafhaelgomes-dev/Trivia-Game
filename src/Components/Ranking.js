import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends Component {
  handleClickHome = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div data-testid="ranking-title">
        <h1> Ranking </h1>
        <button
          data-testid="btn-go-home"
          type="submit"
          onClick={ this.handleClickHome }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Ranking);
