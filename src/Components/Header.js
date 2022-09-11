import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, score } = this.props;
    // const hashEmail = md5(email).toString();

    return (
      <section>
        <img
          data-testid="header-profile-picture"
          src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc"
          alt="gravatar"
        />
        <h2 data-testid="header-player-name">
          { name }
        </h2>
        <h2 data-testid="header-score">
          {' '}
          { score }
          {' '}
        </h2>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  // email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
