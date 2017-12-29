import { Component,OnInit,ViewChild, ElementRef } from '@angular/core';
import { IntentService } from '../services/intent.service';
import { IntentMessageService } from '../services/intent-message.service';
@Component ({
   selector: 'app-intent',
   templateUrl: 'intent.html',
   styleUrls: ['intent.css'],
})
export class AppIntent  implements OnInit{
	@ViewChild('closeBtn') closeBtn: ElementRef;
	name: string;
  user_says: string;
  response_message: string;
  entityName: string;
  entityValue: string;
  entities: any;
  intents: any;
	selectedIntent: any;
	hideAlert: boolean = true;
	constructor(private intentService:IntentService,private intentMessageService:IntentMessageService) {
	}
  	ngOnInit() {
        this.intentService.list().subscribe(    
          suc => {
            console.log('suc in list=');
            console.log(suc);
            this.intents = suc.intents;
            if(this.intents.length > 0) {
              this.selectedIntent = this.intents[0];

              this.intentService.listEntities(this.selectedIntent.ID).subscribe(    
                suc => {
                  console.log('suc in listEntities=');
                  console.log(suc);
                  this.selectedIntent.intentEntities = suc.intentEntities;
                },
                err => {
                   console.log(err);
                }
              );

            }
          },
          err => {
             console.log(err);
          }
        );
  	}

  saveEntity() {
        this.intentService.saveEntity(this.selectedIntent.ID,this.entityName,this.entityValue).subscribe(    
          suc => {
            console.log('suc in saveEntity=');
            console.log(suc);
            this.entityName = '';
            this.entityValue = '';
            this.selectedIntent.intentEntities = this.selectedIntent.intentEntities.concat(suc.intentEntities);
          },
          err => {
             console.log(err);
          }
        );  
  }  

  deleteIntentEntity(id:number,intent_id:number) {
        this.intentService.deleteIntentEntity(id).subscribe(    
          suc => {
            if(suc.code == 200) {   
              for(var i = this.selectedIntent.intentEntities.length - 1; i >= 0; i--) {
                if(this.selectedIntent.intentEntities[i].ID == id) {
                   this.selectedIntent.intentEntities.splice(i, 1);
                }
              }                      
            }
            else {
            }
          },
          err => {
            console.log(err);
          }
        ); 
  }

	intentClick(event, newValue) {
	    console.log(newValue);
	    this.selectedIntent = newValue;  
	}

  	closeModal(): void {
  	  this.hideAlert = true;
  	  this.name = '';
  	}
  	deleteIntent(): void {
      console.log('this.selectedIntent=');
      console.log(this.selectedIntent);
      if(!this.selectedIntent) {
        return;
      }
        this.intentService.delete(this.selectedIntent.ID).subscribe(    
          suc => {
            console.log(suc);
            if(suc.code == 200) {  
              this.removeCurrentIntent();    
            }
            else {
            }
          },
          err => {
            console.log(err);
          }
        ); 
  	}
  removeCurrentIntent(): void {
    console.log('this.selectedIntent.ID=' + this.selectedIntent.ID);
    for(var i = this.intents.length - 1; i >= 0; i--) {
      if(this.intents[i].ID == this.selectedIntent.ID) {
        console.log(this.intents[i].ID);
         this.intents.splice(i, 1);
         this.selectedIntent = '';
      }
    }
  }
  saveUserSays() {
        this.intentMessageService.create(this.selectedIntent.ID,1,this.user_says).subscribe(    
          suc => {
            console.log(suc);
            if(suc.code == 200) {
              var intentMessages = suc.intentMessages;
              this.selectedIntent.UserSays = intentMessages;
              this.user_says = '';  
            }
            else {
              console.log('error');
            }
          },
          err => {
             console.log(err);
          }
        );    
  }
  deleteIntentMessage(id:number,intent_id:number,type:number) {
    console.log('id in begin=' + id);
    console.log('type = ' + type);
    console.log('intent_id =' + intent_id);
        this.intentMessageService.delete(id,intent_id,type).subscribe(    
          suc => {
            console.log('id=' + id);
            if(suc.code == 200) {   
              for(var i = this.selectedIntent.UserSays.length - 1; i >= 0; i--) {
                console.log('the id=' + this.selectedIntent.UserSays[i].ID);
                if(this.selectedIntent.UserSays[i].ID == id) {
                   this.selectedIntent.UserSays.splice(i, 1);
                }
              }     
              for(var i = this.selectedIntent.Response.length - 1; i >= 0; i--) {
                if(this.selectedIntent.Response[i].ID == id) {
                   this.selectedIntent.Response.splice(i, 1);
                }
              }                        
            }
            else {
            }
          },
          err => {
            console.log(err);
          }
        );   
  }
  saveResponse() {
        this.intentMessageService.create(this.selectedIntent.ID,2,this.response_message).subscribe(    
          suc => {
            console.log(suc);
            if(suc.code == 200) {
              var intentMessages = suc.intentMessages;
              this.selectedIntent.Response = intentMessages;             
              this.response_message = '';
            }
            else {
              console.log('error');
            }
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
            if(suc.code == 200) {
	            var newIntents = suc.intents;
              this.selectedIntent = newIntents[0];
	            this.intents = this.intents.concat(newIntents);
	            this.closeBtn.nativeElement.click();          
            }
            else {
            	console.log('error');
            	this.hideAlert = false;
            }
          },
          err => {
             console.log(err);
          }
        ); 		
	}
}