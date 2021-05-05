import * as actionTypes from '../actions/actionTypes';
import {AddProductsAction, ProductState, SetProductsAction} from '../../types';

const initialState = {
  products: [],
  isLastPage: false,
};

const productsReducer = (
  state: ProductState = initialState,
  action: AddProductsAction,
) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCTS:
      return addProducts(state, action);
    case actionTypes.SET_FILTERED_PRODUCTS:
      return setFilteredProducts(state, action);
    case actionTypes.EMPTY_PRODUCTS:
      return emptyProducts(state);
    default:
      return state;
  }
};

const addProducts = (state: ProductState, action: AddProductsAction) => {
  if (action.isLastPage) {
    return {
      ...state,
      products: [...state.products, ...action.products],
      isLastPage: true,
    };
  }
  return {...state, products: [...state.products, ...action.products]};
};

const emptyProducts = (state: ProductState) => {
  return {...state, products: [], isLastPage: false};
}

const setFilteredProducts = (
  state: ProductState,
  action: SetProductsAction,
) => {
  return {...state, products: [...action.products]};
};

export default productsReducer;
