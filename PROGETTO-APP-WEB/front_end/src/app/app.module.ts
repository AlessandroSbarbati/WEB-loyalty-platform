import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';



import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';




import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './authentication/services/auth.interceptor';
import { HeaderStickyComponent } from './header-sticky/header-sticky.component';
import { ProfiloComponent } from './profilo/profilo.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { CarteComponent } from './carte/carte.component';
import { PremiComponent } from './premi/premi.component';
import { FooterComponent } from './footer/footer.component';
import { BenvenutoComponent } from './benvenuto/benvenuto.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderStickyComponent,
    ProfiloComponent,
    MainpageComponent,
    CarteComponent,
    PremiComponent,
    FooterComponent,
    BenvenutoComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatTabsModule,
    MatRadioModule,
    MatListModule,
    MatGridListModule, 
    FormsModule, 
    ReactiveFormsModule,
    MatSidenavModule,
    HttpClientModule,
    MatExpansionModule

    

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:JwtInterceptor,
      multi:true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
