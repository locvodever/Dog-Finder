import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DogBreed } from '../models/dog';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private baseUrl = 'https://api.thedogapi.com/v1';

  constructor(private http: HttpClient, private userDataService: UserDataService) {}

  getBreeds(page: number, limit: number): Observable<DogBreed[]> {
    return this.http.get<DogBreed[]>(`${this.baseUrl}/breeds`, { params: { page, limit } });
  }

  getBreed(id: string): Observable<DogBreed> {
    return this.http.get<DogBreed>(`${this.baseUrl}/breeds/${id}`);
  }

  getImage(imageId: string) {
    return this.http.get<any>(`${this.baseUrl}/images/${imageId}`).pipe(map((e) => e.url));
  }

  postVote(imageId: string, vote: 1 | -1) {
    return this.http
      .post<any>(`${this.baseUrl}/votes`, {
        image_id: imageId,
        sub_id: null,
        value: vote,
      })
      .pipe(map((e) => e.url));
  }
}
