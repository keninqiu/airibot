import { Component,OnInit,ViewChild, ElementRef } from '@angular/core';
import { EntityService } from '../services/entity.service';
@Component ({
   selector: 'app-entity',
   templateUrl: 'entity.html',
   styleUrls: ['entity.css'],
})
export class AppEntity  implements OnInit{
	constructor(private entityService:EntityService) {
	}
  	ngOnInit() {
  	}
}