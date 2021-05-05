import axios from 'axios';
import {Dispatch} from 'redux';

import {apiHost} from '../../../bin/config';
import {ADD_PRODUCTS, SET_FILTERED_PRODUCTS, EMPTY_PRODUCTS} from './actionTypes';
import {Product} from '../../types';

export const addProducts = (products: Product[]) => async (
  dispatch: Dispatch,
) => {
  let isLastPage = false;

  try {
    if (products && products.length && products.length < 10) {
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
        type: EMPTY_PRODUCTS
    };
}
