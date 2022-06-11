import { Component, OnInit } from '@angular/core';
import { Filter } from '../../models/filter.type';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data-service.service';

@Component({
  selector: 'cov-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.sass']
})
export class ReportComponent implements OnInit {

  filter: Filter =  'cases';

  constructor(
    private apiService: ApiService,
    public dataService: DataService
  ) { }

  ngOnInit(): void {
    this.apiService.getStat().subscribe(res =>
      this.dataService.setfilterdData('cases',res.response)
    )
  }

  filterData(filter: Filter){
    this.filter = filter;
    this.dataService.setfilterdData(filter)
  }



}
