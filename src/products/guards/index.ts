import { PizzasGuard } from './pizzas.guard';
import { PizzaExistGuard } from './pizza-exist.guard';

export const guards: any[] = [PizzasGuard, PizzaExistGuard];

export * from './pizzas.guard';
export * from './pizza-exist.guard';
