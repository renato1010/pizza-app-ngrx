import * as fromReducer from './pizzas.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface ProductsState {
  pizzas: fromReducer.PizzaState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromReducer.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');


