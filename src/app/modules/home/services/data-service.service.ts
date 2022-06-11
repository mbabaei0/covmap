import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Filter } from '../models/filter.type';
import { CovidStat } from '../models/stat.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _stats: BehaviorSubject<Array<CovidStat>> = new BehaviorSubject<Array<CovidStat>>(null);
  public readonly stats$: Observable<Array<CovidStat>> = this._stats.asObservable()

  private _countries: Subject<Array<string>> = new BehaviorSubject<Array<string>>([]);
  public readonly countries$: Observable<Array<string>> = this._countries.asObservable();

  constructor() { }

  setStats(data: CovidStat[]){
    this._stats.next(data)
  }
  setCountries(data: string[]){
    this._countries.next(data)
  }

  setfilterdData(filter: Filter, data?:Array<CovidStat>) {
    const filtredData =( data ||  this._stats.getValue()).map( data=> {
      return {
        ...data,
        percent: data[filter].total  * 100 / data.population
      }
    })
    this._stats.next(filtredData)

  }

}
