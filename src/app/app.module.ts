import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { NgwWowModule } from 'ngx-wow';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../app/material.module';
import { HomeComponent } from './home/home.component';
import { NgChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SetTimeComponent } from './set-time/set-time.component';
import { AutoComponent } from './auto/auto.component';
import { ChartComponent } from './chart/chart.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SetTimeComponent,
    AutoComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // NgwWowModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    NgChartsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    TimepickerModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
