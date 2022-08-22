/* eslint-disable linebreak-style */

/* selectors */
export const getUser = ({loggedUser}) => loggedUser;


/* action name creator */
// const reducerName = 'users';
// const createActionName = name => `app/${reducerName}/${name}`;

export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {

    // case GET_USER: {
    //   return {
    //     ...statePart,
        
    //   };
    // }
    default:
      return statePart;
  }
};