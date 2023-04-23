import { TestBed } from '@angular/core/testing';

import { FoodRecipesService } from './food-recipes.service';

describe('FoodRecipesService', () => {
  let service: FoodRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
