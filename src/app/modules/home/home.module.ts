import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ReportComponent } from './pages/report/report.component';
import { MapComponent } from './components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CountryChartComponent } from './components/country-chart/country-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { CountryChartPieComponent } from './components/country-chart-pie/country-chart-pie.component';


@NgModule({
  declarations: [
    ReportComponent,
    MapComponent,
    CountryChartComponent,
    CountryChartPieComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LeafletModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ]
})
export class HomeModule { }
