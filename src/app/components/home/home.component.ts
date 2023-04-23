import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FoodRecipesService } from 'src/app/services/food-recipes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private recipeSub: Subscription;
  private featuredSub: Subscription;
  private cuisineSub: Subscription;
  private recipeIdSub: Subscription;
  recipes: [] = [];
  featuredRecipe: [] = [];
  initial: string = 'pasta';
  cuisines: [] = [];
  recipeInfo: [] = [];
  id: any;

  constructor(private foodRecipeService: FoodRecipesService) {}

  ngOnInit(): void {
    // init recipe info
    let search: string = 'lemon chicken';
    this.searchByName(search);

    // init featured recipe
    this.featuredSub = this.foodRecipeService
      .getFeaturedFoodRecipes()
      .subscribe((results) => {
        this.featuredRecipe = results.recipes;
      });

    // init cuisines
    let name: string = 'italian';
    this.cuisineSub = this.foodRecipeService
      .getFoodCuisines(name)
      .subscribe((results) => {
        this.cuisines = results.recipes;
      });
  }

  onSubmit(form: NgForm) {
    this.searchByName(form.value.search);
  }

  searchByName(name: string) {
    this.recipeSub = this.foodRecipeService
      .getFoodRecipes(name)
      .subscribe((results) => {
        this.id = results.recipes[0]['id'];
        this.fetchById(this.id);
      });
  }
  fetchById(id: any) {
    this.recipeIdSub = this.foodRecipeService.getById(id).subscribe((data) => {
      this.recipeInfo = data.recipes[0];
    });
  }

  selectCuisine(event: Event) {
    let name: string = (event.target as Element).id;
    this.cuisineSub = this.foodRecipeService
      .getFoodCuisines(name)
      .subscribe((cuisines) => {
        this.cuisines = cuisines.recipes;
      });
  }

  ngOnDestroy(): void {
    if (this.cuisineSub) {
      this.cuisineSub.unsubscribe();
    }
    if (this.featuredSub) {
      this.featuredSub.unsubscribe();
    }
    if (this.recipeSub) {
      this.recipeSub.unsubscribe();
    }
    if (this.recipeIdSub) {
      this.recipeIdSub.unsubscribe();
    }
  }
}
