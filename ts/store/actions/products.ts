import axios from 'axios';
import { apiHost } from '../../../bin/config';
import {ADD_PRODUCTS} from './actionTypes';
import {Dispatch} from 'redux';
import { Product } from '../../types';

export const addProducts = (products: Product[]) => async (dispatch: Dispatch) => {
    let isLastPage = false;

    try {
        if (products && products.length && products.length < 10) {
            isLastPage = true;
        }

        dispatch( {
            type: ADD_PRODUCTS,
            products,
            isLastPage
          });
    }
    
     catch(e) {
         console.error(e);
     };
};
