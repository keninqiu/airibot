import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class AppState {
  public _subject = new Subject<object>();
  public event = this._subject.asObservable();

  public publish(data: any) {
    this._subject.next(data);
  }
}