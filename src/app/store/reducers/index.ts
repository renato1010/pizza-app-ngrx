import { Params, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { RouterStateSerializer } from '@ngrx/router-store/src/serializer';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}
export interface State {
  routerReducer: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: routerReducer
};

// selectors

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>(
  'routerReducer'
);

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url, root: { queryParams } } = routerState;
    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return { url, queryParams, params };
  }
}
