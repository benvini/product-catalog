import {AnyAction} from 'redux';

export interface Product {
  categoryName: string;
  img: string;
  id: number;
  name: string;
  isNatran: boolean;
  isSugar: boolean;
  manufacturerName: string;
  isShumanRavuy: boolean;
  price: number;
}

export interface AddProductsAction extends AnyAction {
  products: Product[];
  type: string;
  isLastPage: boolean;
}

export interface SetProductsAction extends AnyAction {
  products: Product[];
  type: string;
}

export interface EmptyProductsAction extends AnyAction {
  type: string;
}

export interface ProductState {
  products: Product[];
  isLastPage: boolean;
}

export type Routes = {
  productsCatalog: string;
  productDetail: string;
};
