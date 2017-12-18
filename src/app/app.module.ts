import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppIntent } from '../components/intent.component';
import { RouterModule, Routes } from '@angular/router';
import { IntentService } from '../services/intent.service';
import { HttpModule } from '@angular/http';

const appRoutes: Routes = [
   { path: 'intent', component: AppIntent },
];

@NgModule({
  declarations: [
    AppComponent,AppIntent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [IntentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
