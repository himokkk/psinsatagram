import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DogsService {
  private url = 'https://dog.ceo/api/breeds/list/all';

  constructor(private httpClient: HttpClient) { }

  getDogs(){
    return this.httpClient.get(this.url);
  }
}
