import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ReportComponent } from './pages/report/report.component';
import { MapComponent } from './components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


@NgModule({
  declarations: [
    ReportComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LeafletModule
  ]
})
export class HomeModule { }
