import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

// using lettable operators
import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';

// actions
import * as pizzaActions from '../actions/pizzas.actions';
// service
import * as fromServices from '../../services';

@Injectable()
export class PizzasEffects {
  constructor(private actions$: Actions, private pizzaService: fromServices.PizzasService) {}

  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS).pipe(
    switchMap(() => {
      return this.pizzaService
        .getPizzas()
        .pipe(
          map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
          catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
        );
    })
  );

  @Effect()
  createPizza$ = this.actions$
    .ofType(pizzaActions.CREATE_PIZZA)
    .pipe(
      map((action: pizzaActions.CreatePizza) => action.payload),
      switchMap(payload =>
        this.pizzaService
          .createPizza(payload)
          .pipe(
            map(pizza => new pizzaActions.CreatePizzaSuccess(pizza)),
            catchError(error => of(new pizzaActions.CreatePizzaFail(error)))
          )
      )
    );

  @Effect()
  updatePizza$ = this.actions$
    .ofType(pizzaActions.UPDATE_PIZZA)
    .pipe(
      map((action: pizzaActions.UpdatePizza) => action.payload),
      switchMap(payload =>
        this.pizzaService
          .updatePizza(payload)
          .pipe(
            map(pizza => new pizzaActions.UpdatePizzaSuccess(pizza)),
            catchError(error => of(new pizzaActions.UpdatePizzaFail(error)))
          )
      )
    );

  @Effect()
  removePizza$ = this.actions$
    .ofType(pizzaActions.REMOVE_PIZZA)
    .pipe(
      map((action: pizzaActions.RemovePizza) => action.payload),
      switchMap(payload =>
        this.pizzaService
          .removePizza(payload)
          .pipe(
            map(() => new pizzaActions.RemovePizzaSuccess(payload)),
            catchError(error => of(new pizzaActions.RemovePizzaFail(error)))
          )
      )
    );
}
