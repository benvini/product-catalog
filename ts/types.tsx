import { AnyAction } from "redux";

export interface Product {
    categoryName: string;
    img: string;
    imgBig: string;
    id: number;
    name: string;
    isHealthy: boolean;
    isNatran: boolean;
    isSugar: boolean;
    manufacturerName: string;
    isShumanRavuy: boolean;
    price: number;
}

export interface AddProductAction extends AnyAction {
    products: Product[];
    type: string;
}

export interface AddProductState {
    error: boolean;
    products: Product[];
    isLastPage: boolean;
}