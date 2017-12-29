import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppIntent } from '../components/intent.component';
import { AppEntity } from '../components/entity.component';
import { RouterModule, Routes } from '@angular/router';
import { IntentService } from '../services/intent.service';
import { IntentMessageService } from '../services/intent-message.service';
import { HttpModule } from '@angular/http';

const appRoutes: Routes = [
   { path: 'intent', component: AppIntent },
   { path: 'entity', component: AppEntity },
];

@NgModule({
  declarations: [
    AppComponent,AppIntent,AppEntity
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [IntentService,IntentMessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
