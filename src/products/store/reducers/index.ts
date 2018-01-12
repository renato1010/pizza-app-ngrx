import * as fromReducer from './pizzas.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface ProductsState {
  pizzas: fromReducer.PizzaState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromReducer.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');

// pizzas state

export const getPizzaState = createSelector(
  getProductsState,
  (state: ProductsState) => state.pizzas
);

export const getAllPizzas = createSelector(getPizzaState, fromReducer.getPizzas);
export const getPizzasLoaded = createSelector(getPizzaState, fromReducer.getPizzasLoaded);
export const getPizzasLoading = createSelector(getPizzaState, fromReducer.getPizzasLoading);
