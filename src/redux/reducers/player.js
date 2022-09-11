import { REQUEST_API,
  RESPONSE_API,
  GET_NAME, GET_EMAIL,
  RESULT_API,
  CHANGE_SCORE,
} from '../actions/index';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
  score: 0,
  results: {},
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
    };
  case RESPONSE_API:
    return {
      ...state,
      token: action.payload,
    };
  case GET_NAME:
    return {
      ...state,
      name: action.name,
    };
  case GET_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  case RESULT_API:
    return {
      ...state,
      results: action.payload,
    };
  case CHANGE_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  default:
    return state;
  }
}

export default player;
