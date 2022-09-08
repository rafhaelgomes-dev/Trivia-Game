export const REQUEST_API = 'REQUEST_API';
export const RESPONSE_API = 'RESPONSE_API';
export const GET_ERROR = 'GET_ERROR';

export const requestApi = () => ({ type: REQUEST_API });
export const responseApi = (payload) => ({ type: RESPONSE_API, payload });
export const getError = (payload) => ({ type: GET_ERROR, payload });

export function fetchApi() {
  return async (dispatch) => {
    dispatch(requestApi());
    try {
      const url = 'https://opentdb.com/api_token.php?command=request';
      const response = await fetch(url);
      const result = await response.json();
      localStorage.setItem('token', result.token);
      return dispatch(responseApi(result));
    } catch (error) {
      dispatch(getError(error.message));
    }
  };
}
