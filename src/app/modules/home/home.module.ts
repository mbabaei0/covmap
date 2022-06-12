import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { ReportComponent } from './pages/report/report.component';
import { MapComponent } from './components/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CountryChartComponent } from './components/country-chart/country-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { CountryChartPieComponent } from './components/country-chart-pie/country-chart-pie.component';

import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzEmptyModule } from 'ng-zorro-antd/empty';


const ANT_IMPORTS = [
  NzPageHeaderModule,
  NzDividerModule,
  NzGridModule,
  NzCardModule,
  NzButtonModule,
  NzIconModule,
  NzSelectModule,
  NzDatePickerModule,
  NzStatisticModule,
  NzEmptyModule
]
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
    FormsModule,
    LeafletModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    ...ANT_IMPORTS
  ]
})
export class HomeModule { }
