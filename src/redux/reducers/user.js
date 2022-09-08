import { REQUEST_API, RESPONSE_API, GET_NAME, GET_EMAIL } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  email: '',
  token: '',
};

function user(state = INITIAL_STATE, action) {
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
  default:
    return state;
  }
}

export default user;
