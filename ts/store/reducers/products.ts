import * as actionTypes from '../actions/actionTypes';
import {AddProductAction, AddProductState} from '../../types';

const initialState = {
  products: [],
  error: false,
  isLastPage: false
};

const productsReducer = (state: AddProductState = initialState, action: AddProductAction) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCTS: return addProducts(state, action);
    default:
      return state;
  }
};

const addProducts = (state: AddProductState, action: AddProductAction) => {  
  if (action.isLastPage) {
    return { ...state, products: [...state.products, ...action.products], isLastPage: true};
  }
  return { ...state, products: [...state.products, ...action.products]};
}

export default productsReducer;
