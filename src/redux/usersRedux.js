/* eslint-disable linebreak-style */

/* selectors */
export const getUser = ({loggedUser}) => loggedUser;


/* action name creator */
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const GET_USER = createActionName('GET_USER');


export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {

    case GET_USER: {
      return {
        ...statePart,
        
      };
    }
    default:
      return statePart;
  }
};