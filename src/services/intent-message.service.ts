import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class IntentMessageService {

  constructor(private http: Http) { }

  create(intent_id: number, type:number, text: string) {
    return this.http.post ('/api/intentMessage/create',
    {intent_id:intent_id,type:type,text:text})
      .map(res => res.json());
  }
  delete(id: number,intent_id:number,type:number) {
    console.log('type in service.ts=' + type);
    return this.http.post ('/api/intentMessage/delete',
    {id:id,intent_id:intent_id,type:type})
      .map(res => res.json());
  }
  list(intent_id: number) {
    return this.http.get ('/api/intentMessages?intent_id=' + intent_id)
      .map(res => res.json());    
  }
}