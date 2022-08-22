/* eslint-disable linebreak-style */
export const getStatus = ({status}) => status;

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const SET_STATUS = createActionName('SET_STATUS');

/* action creators */
export const updateStatus = payload => ({ payload, type: SET_STATUS });

export const reducer = (statePart = '', action = {}) => {
  switch (action.type) {
    case SET_STATUS: {
      return action.payload;    
    }
    default:
      return statePart;
  }
};