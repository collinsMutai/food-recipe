import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodRecipesService {
  constructor(private http: HttpClient) {}

  getFoodRecipes(name: string): Observable<any> {
    let params = new HttpParams().set('query', name)

    return this.http.get(`${env.BASE_URL}/complexSearch?`, {
      params: params,
    });
  }

  getById(id: any): Observable<any> {
     let params = new HttpParams()
    return this.http.get(`${env.BASE_URL}/${id}/information?`, {
      params: params
    });
  }

  getFeaturedFoodRecipes(): Observable<any> {
     let params = new HttpParams()
    return this.http.get(`${env.BASE_URL}/random?`, {
      params: params,
    });
  }

  getFoodCuisines(name: string): Observable<any> {
    let params = new HttpParams().set('cuisine', name)

    return this.http.get(`${env.BASE_URL}/complexSearch?`, {
      params: params,
    });
  }
}
