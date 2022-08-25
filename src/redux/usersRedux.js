/* eslint-disable linebreak-style */
import axios from 'axios';
import { API_URL } from './config';


/* selectors */
export const getUser = ({user}) => user;


/* action name creator */
const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const LOAD_USER = createActionName('LOAD_USER');
const LOGOUT = createActionName('LOGOUT');

export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const loadUser = payload => ({ payload, type: LOAD_USER });
export const logout = payload => ({ payload, type: LOGOUT });


export const loadUserRequest = () => {
  return async dispatch => {
    try {

      let res = await axios.get(`${API_URL}/users`);
      await new Promise((resolve, reject) => setTimeout(resolve));

      if(res.data.length === 0) return;
      dispatch(loadUser(res.data[0]));
    } catch(e) {
      dispatch(fetchError(e.message));
    }

  };
};

export const logoutRequest = () => {
  return async dispatch => {
    try {

      await axios.get(`${API_URL}/logout`);

    } catch(e) {
      dispatch(fetchError(e.message));
    }

  };
};

export const reducer = (statePart = null, action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case LOAD_USER: {
      return action.payload;     
    }
    case LOGOUT: {
      return action.payload;     
    }
    default:
      return statePart;
  }
};