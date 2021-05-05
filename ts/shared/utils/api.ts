import axios from 'axios';
import {apiHost} from '../../../bin/config';

export const getProducts = (productsLength: number) => {
  return axios.get(apiHost, {
    params: {start: productsLength, end: productsLength + 10},
  });
};

export const getProductsByText = (text: string) => {
  return axios.get(apiHost + 'find_products', {
    params: {text},
  });
};

export const getProductById = (id: string) => {
  return axios.get(apiHost + id, {params: {id}});
};
