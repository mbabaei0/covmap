import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './interceptors/header.interceptor';


import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpinModule } from 'ng-zorro-antd/spin';

const ANT_IMPORTS = [
  NzLayoutModule,
  NzPageHeaderModule,
  NzSpinModule
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...ANT_IMPORTS
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }
  ],
  exports:[
    ...ANT_IMPORTS
  ]
})
export class CoreModule { }
