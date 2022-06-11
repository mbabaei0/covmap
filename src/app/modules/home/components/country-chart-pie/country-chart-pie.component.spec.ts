import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryChartPieComponent } from './country-chart-pie.component';

describe('CountryChartPieComponent', () => {
  let component: CountryChartPieComponent;
  let fixture: ComponentFixture<CountryChartPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryChartPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryChartPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
