import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productsReducer from './reducers/products';

const middlewareEnhancer = applyMiddleware(thunk);
const store = createStore(productsReducer, middlewareEnhancer);

export default store;