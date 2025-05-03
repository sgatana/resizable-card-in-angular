import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ResizableCardComponent } from './shared/resizable-card/resizable-card.component';

@NgModule({
  declarations: [
    AppComponent,
    ResizableCardComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
