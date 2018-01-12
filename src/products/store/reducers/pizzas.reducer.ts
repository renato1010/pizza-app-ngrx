import * as fromActions from '../actions/pizzas.actions';
import { Pizza } from '../../models/pizza.model';
import { LOAD_PIZZAS } from '../actions/pizzas.actions';

export interface PizzaState {
  data: Pizza[];
  loading: boolean;
  loaded: boolean;
}

export const initialState: PizzaState = {
  data: [],
  loaded: false,
  loading: false
};

export function reducer(state = initialState, action: fromActions.PizzasAction): PizzaState {
  switch (action.type) {
    case fromActions.LOAD_PIZZAS: {
      return { ...state, loading: true };
    }
    case fromActions.LOAD_PIZZAS_FAIL: {
      return { ...state, loading: false, loaded: false };
    }
    case fromActions.LOAD_PIZZAS_SUCCESS: {
      const data = action.payload;
      return { ...state, data, loading: false, loaded: true };
    }
  }
  return state;
}

export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzas = (state: PizzaState) => state.data;
