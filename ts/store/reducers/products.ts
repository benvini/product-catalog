import * as actionTypes from '../actions/actionTypes';
import {AddProductsAction, ProductState} from '../../types';

const initialState = {
  products: [],
  isLastPage: false
};

const productsReducer = (state: ProductState = initialState, action: AddProductsAction) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCTS: return addProducts(state, action);
    default:
      return state;
  }
};

const addProducts = (state: ProductState, action: AddProductsAction) => {  
  if (action.isLastPage) {
    return { ...state, products: [...state.products, ...action.products], isLastPage: true};
  }
  return { ...state, products: [...state.products, ...action.products]};
}

export default productsReducer;
