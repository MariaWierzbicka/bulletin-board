/* selectors */
export const getAll = ({posts}) => posts.data;
export const getPublishedPosts = ({posts}) =>  posts.data.filter(post => post.status === 'published');
export const getPost = ({posts}, id) =>  posts.data.find(post => post._id === id);
export const getPostsByUser = ({posts}, id) => posts.data.filter(post => post.authorId === id);

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_POST = createActionName('ADD_POST');
const EDIT_POST = createActionName('EDIT_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

export const addPost = payload => ({ payload, type: ADD_POST });
export const editPost = payload => ({ payload, type: EDIT_POST });

/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
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
    case ADD_POST: {
      console.log(statePart);
      return [...statePart.data, { ...action.payload }];

    }
    case EDIT_POST: {
      // statePart.data = statePart.data.map(post => (post._id === action.payload._id ? {...post, ...action.payload} : post));
      // return statePart;
      console.log(statePart.data);
      return statePart.data.map(post => (post._id === action.payload._id ? {...post, ...action.payload} : post)); 
    }
    default:
      return statePart;
  }
};
