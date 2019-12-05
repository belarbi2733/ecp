import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerconfigService {
  readonly nodeUrl = 'http://localhost:8081';
constructor() { 

}
}
