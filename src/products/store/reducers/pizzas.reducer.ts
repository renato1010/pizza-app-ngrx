import * as fromActions from '../actions/pizzas.actions';
import { Pizza } from '../../models/pizza.model';
import { LOAD_PIZZAS } from '../actions/pizzas.actions';
import { stagger } from '@angular/core/src/animation/dsl';

export interface PizzaState {
  entities: { [id: number]: Pizza };
  loading: boolean;
  loaded: boolean;
}

export const initialState: PizzaState = {
  entities: {},
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
      const pizzas = action.payload;
      const entities = pizzas.reduce(
        (entities: { [id: number]: Pizza }, pizza: Pizza) => {
          return { ...entities, [pizza.id]: pizza };
        },
        { ...state.entities }
      );
      return { ...state, entities, loading: false, loaded: true };
    }
    case fromActions.UPDATE_PIZZA_SUCCESS:
    case fromActions.CREATE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const pizzaEntity = { [pizza.id]: pizza };
      const entities = { ...state.entities, pizzaEntity };
      return {
        ...state,
        entities,
        loaded: true,
        loading: false
      };
    }
    case fromActions.REMOVE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const { [pizza.id]: removed, ...entities } = state.entities;
      return {
        ...state,
        entities,
        loaded: true,
        loading: false
      };
    }
  }
  return state;
}

export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
