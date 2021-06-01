import {Dispatch} from 'redux';

import {
  ADD_PRODUCTS,
  SET_FILTERED_PRODUCTS,
  EMPTY_PRODUCTS,
} from './actionTypes';
import {Product} from '../../types';
import {MAX_PRODUCTS_AMOUNT} from '../../constants/constants';

export const addProducts = (products: Product[]) => async (
  dispatch: Dispatch,
) => {
  let isLastPage = false;

  try {
    if (products && products.length && products.length < MAX_PRODUCTS_AMOUNT) {
      isLastPage = true;
    }

    dispatch({
      type: ADD_PRODUCTS,
      products,
      isLastPage,
    });
  } catch (e) {
    console.error(e);
  }
};

export const setFilteredProducts = (products: Product[]) => async (
  dispatch: Dispatch,
) => {
  try {
    dispatch({
      type: SET_FILTERED_PRODUCTS,
      products,
    });
  } catch (e) {
    console.error(e);
  }
};

export const emptyProducts = () => {
  return {
    type: EMPTY_PRODUCTS,
  };
};
