import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi, getEmail, getName, fetchApiResult } from '../redux/actions';
import styles from './Login.module.css';
import LogoTrivi from '../Assets/logotrivia.svg';
import IconeTrybe from '../Assets/iconetrybe.svg';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isBtnDisabled: true,
    Carregando: false,
  };

  validateEmail = () => {
    const { email } = this.state;
    const verifyRegexEmail = /\S+@\S+\.\S+/;

    return verifyRegexEmail.test(email) && email;
  };

  validateName = () => {
    const { name } = this.state;
    const nameMinLength = 4;

    return name.length >= nameMinLength;
  };

  validateBtn = () => {
    this.setState({
      isBtnDisabled: !(this.validateName() && this.validateEmail()),
    });
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateBtn());
  };

  handleClickSubmit = async (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { name, email } = this.state;
    this.setState({
      Carregando: true,
    });
    dispatch(getName(name));
    dispatch(getEmail(email));
    await dispatch(fetchApi());
    const token = localStorage.getItem('token');
    await dispatch(fetchApiResult(token));
    this.setState({
      Carregando: false,
    });
    history.push('/game');
  };

  render() {
    const { isBtnDisabled, Carregando } = this.state;
    return (
      <main className={ styles.main }>
        <img src={ LogoTrivi } alt="Logo Trivia" />
        <form className={ styles.form }>
          <label htmlFor="name">
            <input
              className={ styles.inputText }
              type="text"
              data-testid="input-player-name"
              name="name"
              id="name"
              placeholder="Qual é o seu nome?"
              onChange={ this.handleInput }
              required
            />
          </label>

          <label htmlFor="email">
            <input
              className={ styles.inputText }
              type="text"
              data-testid="input-gravatar-email"
              name="email"
              id="email"
              placeholder="Qual é o seu e-mail?"
              onChange={ this.handleInput }
              required
            />
          </label>

          <button
            className={ styles.button }
            type="submit"
            data-testid="btn-play"
            onClick={ this.handleClickSubmit }
            disabled={ isBtnDisabled }
          >
            {Carregando ? 'Carregando...' : 'Jogar'}
          </button>
        </form>
        <img src={ IconeTrybe } alt="Icone Trybe" />
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  Results: state.player.results,
});

export default connect(mapStateToProps, null)(Login);
