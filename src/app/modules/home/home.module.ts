import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ReportComponent } from './pages/report/report.component';
import { MapComponent } from './components/map/map.component';


@NgModule({
  declarations: [
    ReportComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
