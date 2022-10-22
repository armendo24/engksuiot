import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoComponent } from './auto/auto.component';
import { ChartComponent } from './chart/chart.component';
import { HomeComponent } from './home/home.component';
import { SetTimeComponent } from './set-time/set-time.component';

const routes: Routes = [
  {
    path:'' ,component:HomeComponent
  },
  {
    path:'home' ,component:HomeComponent
  },
  {
    path:'set-time' ,component:SetTimeComponent
  },
  {
    path:'auto' ,component:AutoComponent
  },
  {
    path:'chart' ,component:ChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
