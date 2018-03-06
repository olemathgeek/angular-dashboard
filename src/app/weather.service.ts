import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class WeatherService {
  private conditionsUrl = 'http://api.wunderground.com/api/ebe965a96fa2346b/conditions/q/MN/Osseo.json';
  private forecastUrl = 'http://api.wunderground.com/api/ebe965a96fa2346b/forecast/q/MN/Osseo.json';

  constructor(private http: HttpClient) {
  }

  getConditions(): Observable<any> {
    return this.http.get(this.conditionsUrl);
  }

  getForecast(): Observable<any> {
    return this.http.get(this.forecastUrl);
  }

}
