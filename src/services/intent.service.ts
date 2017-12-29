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
  delete(id: number) {
    return this.http.post ('/api/intent/delete',
    {id:id})
      .map(res => res.json());
  }
  deleteIntentEntity(id: number) {
    return this.http.post ('/api/intent/deleteEntity',
    {id:id})
      .map(res => res.json());
  }
  list() {
    return this.http.get ('/api/intents')
      .map(res => res.json());    
  }
  listEntities(intent_id:number) {
    return this.http.post ('/api/intent/listEntities',
    {intent_id:intent_id})
      .map(res => res.json());    
  }  
  saveEntity(intent_id:number,name:string,value:string) {
    return this.http.post ('/api/intent/saveEntity',
    {intent_id:intent_id,name:name,value:value})
      .map(res => res.json());  
  }
}