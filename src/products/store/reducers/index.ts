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

export const getPizzasEntities = createSelector(getPizzaState, fromReducer.getPizzasEntities);
export const getAllPizzas = createSelector(getPizzasEntities, entities => {
  return Object.keys(entities).map(id => entities[+id]);
});

export const getPizzasLoaded = createSelector(getPizzaState, fromReducer.getPizzasLoaded);
export const getPizzasLoading = createSelector(getPizzaState, fromReducer.getPizzasLoading);
