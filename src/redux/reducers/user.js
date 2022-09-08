import { REQUEST_API, RESPONSE_API } from '../actions/index';

const INITIAL_STATE = {
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
  default:
    return state;
  }
}

export default user;
