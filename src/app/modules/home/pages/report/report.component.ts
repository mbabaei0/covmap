import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Filter } from '../../models/filter.type';
import { CovidStat } from '../../models/stat.model';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data-service.service';

@Component({
  selector: 'cov-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.sass'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ReportComponent implements OnInit {

  filter: Filter = 'cases';
  selectedCountry = 'UAE';

  date;

  selectedNumbers = [0, 0, 0];
  chartLabels = ['Cases', 'Death', 'Tests']

  selecteStat:CovidStat;

  constructor(
    private apiService: ApiService,
    public dataService: DataService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.apiService.getStat().subscribe(res =>
      this.dataService.setfilterdData(this.filter, res.response)
    )
  }

  filterData(filter: Filter) {
    this.filter = filter;
    this.dataService.setfilterdData(filter)
  }

  onSelectContry(ev) {
    this.selectedCountry = ev.name;
    this.prepareChartData(ev.name)
    this.cdr.detectChanges()
    this.cdr.markForCheck()
  }

  prepareChartData(name) {
    const d = this.dataService.getCountryData(name)
    this.mapData(d)
  }

  async onDateChange(ev) {

    if (!ev) return;
    this.apiService.getHistory(this.selectedCountry, ev.toISOString().slice(0, 10)).subscribe(res => {
      this.mapData(res.response[0])
    })
  }


  private mapData(d: CovidStat) {
    if (d) {
      this.selecteStat = d;
      this.date = d.day;
      this.selectedNumbers = [d.cases.total, d.deaths.total, d.tests.total]

    } else {
      this.selectedNumbers = [0, 0, 0];
      this.selecteStat = null;
    }
  }
}
