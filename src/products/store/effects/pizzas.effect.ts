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
}
