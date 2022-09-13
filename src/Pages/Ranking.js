import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resettingScore } from '../redux/actions';
import styles from './Ranking.module.css';
import logo from '../Assets/logotrivia.svg';

class Ranking extends Component {
  handleClickHome = (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    dispatch(resettingScore());
    history.push('/');
  };

  render() {
    const rankingDB = JSON.parse(localStorage.getItem('ranking'));
    if (rankingDB === null) {
      return <p>Ranking Vazio...</p>;
    }
    return (
      <div className={ styles.main }>
        <img className={ styles.logo } src={ logo } alt="logo trivia" />
        <div className={ styles.section }>
          <h1> Ranking </h1>
          <section className={ styles.ranking }>
            {rankingDB.map((e, i) => (
              <div className={ styles.rankingUser } key={ i }>
                <div className={ styles.divUser }>
                  <img src={ e.picture } alt="imagem User" />
                  <p data-testid={ `player-name-${i}` }>{e.name}</p>
                </div>
                <p data-testid={ `player-score-${i}` }>{`${e.score} Pontos`}</p>
              </div>
            ))}
          </section>
          <button
            data-testid="btn-go-home"
            type="submit"
            onClick={ this.handleClickHome }
          >
            Home
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  imagem: state.player.imagem,
  name: state.player.name,
  Ranking: state.player.Ranking,
});

export default connect(mapStateToProps)(Ranking);
