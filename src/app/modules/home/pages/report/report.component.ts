import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Filter } from '../../models/filter.type';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data-service.service';

@Component({
  selector: 'cov-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.sass'],
  changeDetection:ChangeDetectionStrategy.Default
})
export class ReportComponent implements OnInit {

  filter: Filter =  'cases';
  selectedCountry;
  selectedNumbers= [0,0,0];
  chartLabels = ['Cases','Death','Tests']


  constructor(
    private apiService: ApiService,
    public dataService: DataService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.apiService.getStat().subscribe(res =>
      this.dataService.setfilterdData(this.filter,res.response)
    )
  }

  filterData(filter: Filter){
    this.filter = filter;
    this.dataService.setfilterdData(filter)
  }

  onSelectContry(ev){
    this.selectedCountry = ev;
    this.prepareChartData(ev)
    this.cdr.detectChanges()
  }

  private prepareChartData(ev): number[]{
    const d = this.dataService.getCountryData(ev.name)
    if(d) return this.selectedNumbers = [d.cases.total,d.deaths.total, d.tests.total]
    return this.selectedNumbers = [0,0,0]

  }



}
