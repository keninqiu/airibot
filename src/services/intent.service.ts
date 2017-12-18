import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class IntentService {

  constructor(private http: Http) { }

  create(name: string) {
    return this.http.post ('/api/intent/create',
    {name:name})
      .map(res => res.json());
  }
  list() {
    return this.http.get ('/api/intents')
      .map(res => res.json());    
  }
}