import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getImg } from '../redux/actions';
import styles from '../Pages/Game.module.css';
import IconeStar from '../Assets/iconestar.svg';
// import md5 from 'crypto-js/md5';

class Header extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getImg('https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc'));
  }

  render() {
    const { name, score, email } = this.props;
    // const hashEmail = md5(email).toString();

    return (
      <section className={ styles.header }>
        <img
          className={ styles.imgUser }
          data-testid="header-profile-picture"
          src="https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc"
          alt="gravatar"
        />
        <h2 data-testid="header-player-name">
          { name }
        </h2>
        <img src={ IconeStar } alt="Icone Star" className={ styles.iconeStar } />
        <h2 data-testid="header-score">
          {' '}
          {`Pontos: ${score}` }
          {' '}
        </h2>
        <h2 className={ styles.inputEmail } data-testid="input-gravatar-email">
          { email }
        </h2>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  email: state.player.email,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
