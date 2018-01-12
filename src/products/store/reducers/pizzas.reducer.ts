import * as fromActions from '../actions/pizzas.actions';
import { Pizza } from '../../models/pizza.model';
import { LOAD_PIZZAS } from '../actions/pizzas.actions';

export interface PizzaState {
  data: Pizza[];
  loading: boolean;
  loaded: boolean;
}

export const initialState: PizzaState = {
  data: [
    {
      name: "Seaside Surfin'",
      toppings: [
        {
          id: 6,
          name: 'mushroom'
        },
        {
          id: 7,
          name: 'olive'
        },
        {
          id: 2,
          name: 'bacon'
        },
        {
          id: 3,
          name: 'basil'
        },
        {
          id: 1,
          name: 'anchovy'
        },
        {
          id: 8,
          name: 'onion'
        },
        {
          id: 11,
          name: 'sweetcorn'
        },
        {
          id: 9,
          name: 'pepper'
        },
        {
          id: 5,
          name: 'mozzarella'
        }
      ],
      id: 2
    }
  ],
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
      return { ...state, loading: false, loaded: true };
    }
  }
  return state;
}

export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzas = (state: PizzaState) => state.data;
