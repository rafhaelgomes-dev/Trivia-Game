import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi, getEmail, getName } from '../redux/actions';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isBtnDisabled: true,
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
    dispatch(getName(name));
    dispatch(getEmail(email));
    await dispatch(fetchApi());
    history.push('/game');
  };

  handleClickConfig = (event) => {
    event.preventDefault();
    const { history } = this.props;

    history.push('/config');
  };

  render() {
    const { isBtnDisabled } = this.state;
    return (
      <form>
        <div>Login</div>
        <label htmlFor="name">
          Name
          <input
            type="text"
            data-testid="input-player-name"
            name="name"
            id="name"
            onChange={ this.handleInput }
            required
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            type="text"
            data-testid="input-gravatar-email"
            name="email"
            id="email"
            onChange={ this.handleInput }
            required
          />
        </label>

        <button
          type="submit"
          data-testid="btn-play"
          onClick={ this.handleClickSubmit }
          disabled={ isBtnDisabled }
        >
          Play
        </button>

        <button
          type="submit"
          data-testid="btn-settings"
          onClick={ this.handleClickConfig }
        >
          Configurações
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
