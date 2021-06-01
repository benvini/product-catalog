import axios from 'axios';
import {Product} from '~types';

import {apiHost} from '../../../bin/config';
import {MAX_PRODUCTS_AMOUNT} from '../../constants/constants';

export const getProducts = (productsLength: number) => {
  return axios.get<Product[]>(apiHost, {
    params: {start: productsLength, end: productsLength + MAX_PRODUCTS_AMOUNT},
  });
};

export const getProductsByText = (text: string) => {
  return axios.get<Product[]>(apiHost + 'find_products', {
    params: {text},
  });
};

export const getProductById = (id: string) => {
  return axios.get<Product>(apiHost + id, {params: {id}});
};
