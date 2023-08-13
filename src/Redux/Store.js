import { applyMiddleware, createStore } from 'redux';
import rootReducer from './Reducers/rootReducer'; 
import thunk from 'redux-thunk'; 


const initialState = {};


const middleware = [thunk]; 


const Store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default Store;