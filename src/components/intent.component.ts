import { Component,OnInit } from '@angular/core';
import { IntentService } from '../services/intent.service';

@Component ({
   selector: 'app-intent',
   templateUrl: 'intent.html',
   styleUrls: ['intent.css'],
})
export class AppIntent  implements OnInit{
	name: string;
	intents: any;
	constructor(private intentService:IntentService) {
	}
  	ngOnInit() {
        this.intentService.list().subscribe(    
          suc => {
            console.log(suc);
            this.intents = suc.intents;
          },
          err => {
             console.log(err);
          }
        );
  	}
	saveIntent(): void {
		console.log("save intent for " + this.name);
        this.intentService.create(this.name).subscribe(    
          suc => {
            console.log(suc);
          },
          err => {
             console.log(err);
          }
        ); 		
	}
}