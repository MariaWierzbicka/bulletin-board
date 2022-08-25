import axios from 'axios';
import { API_URL } from './config';

/* selectors */
export const getPublishedPosts = ({posts}) =>  posts.data.filter(post => post.status === 'published');
export const getPost = ({posts}, id) =>  posts.data.find(post => post._id === id);
export const getPostsByUser = ({posts}, id) => posts.data.filter(post => post.authorId === id);

export const getPosts = ({ posts }) => posts.data;
export const getLoading = ({ posts }) => posts.loading;

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

const ADD_POST = createActionName('ADD_POST');
const EDIT_POST = createActionName('EDIT_POST');
const LOAD_POSTS = createActionName('LOAD_POSTS');
const LOAD_SINGLE_POST = createActionName('LOAD_SINGLE_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

export const loadPosts = payload => ({ payload, type: LOAD_POSTS });
export const loadSinglePost = payload => ({ payload, type: LOAD_SINGLE_POST });

export const addPost = payload => ({ payload, type: ADD_POST });
export const editPost = payload => ({ payload, type: EDIT_POST });

/* thunk creators */

export const loadPostsRequest = () => {
  return async dispatch => {

    dispatch(fetchStarted());
    try {

      let res = await axios.get(`${API_URL}/posts`);
      await new Promise((resolve, reject) => setTimeout(resolve));

      dispatch(loadPosts(res.data));
      // dispatch(fetchSuccess());

    } catch(e) {
      dispatch(fetchError(e.message));
    }

  };
};

export const loadUserPostsRequest = id => {
  return async dispatch => {

    dispatch(fetchStarted());
    try {

      let res = await axios.get(`${API_URL}/users/${id}/posts`);
      await new Promise((resolve, reject) => setTimeout(resolve));

      dispatch(loadPosts(res.data));
      // dispatch(fetchSuccess());

    } catch(e) {
      dispatch(fetchError(e.message));
    }

  };
};

export const loadSinglePostRequest = id => {
  return async dispatch => {

    dispatch(fetchStarted());
    try {

      let res = await axios.get(`${API_URL}/posts/${id}`);
      await new Promise((resolve, reject) => setTimeout(resolve));

      dispatch(loadSinglePost(res.data));
      // dispatch(fetchSuccess());

    } catch(e) {
      dispatch(fetchError(e.message));
    }

  };
};

export const addPostRequest = post => {
  return async dispatch => {

    dispatch(fetchStarted());
    try {
      // let res = 
      await axios.post(`${API_URL}/posts/add`, post);
      await new Promise((resolve, reject) => setTimeout(resolve));
      dispatch(addPost(post));

    } catch(e) {
      dispatch(fetchError(e.message));
    }

  };
};

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
    case LOAD_POSTS: {
      return { ...statePart, data: action.payload, 
        loading: {
          active: false,
          error: false,
        },
      };
    }
    case LOAD_SINGLE_POST: {
      return { ...statePart, data: [...statePart.data, action.payload], 
        loading: {
          active: false,
          error: false,
        },
      };
    }
    case ADD_POST: {
      return { ...statePart, data: [...statePart.data, action.payload] ,
        loading: {
          active: false,
          error: false,
        },
      };

    }
    case EDIT_POST: {
      return statePart.data.map(post => (post._id === action.payload._id ? {...post, ...action.payload} : post)); 
    }
    default:
      return statePart;
  }
};
