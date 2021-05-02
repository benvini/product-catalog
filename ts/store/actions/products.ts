import axios from 'axios';
import { apiHost } from '../../../bin/config';
import {ADD_PRODUCTS} from './actionTypes';
import {Dispatch} from 'redux';

export const addProducts = (productsLength: number) => async (dispatch: Dispatch) => {
    let isLastPage = false;

    try {
        const fetchedProducts = await axios.get(apiHost, {
            params: { start: productsLength, end: (productsLength + 10) }
        });
        
        if (fetchedProducts.data && fetchedProducts.data.length && fetchedProducts.data.length < 10) {
            isLastPage = true;
        }

        dispatch({
            type: ADD_PRODUCTS,
            products: fetchedProducts.data,
            isLastPage
          });
    }
    
     catch(e) {
         console.error(e);
     };
};
