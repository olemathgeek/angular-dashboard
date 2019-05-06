import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class WeatherService {
  private conditionsUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=55311,us&APPID=08b134e0daf54b3f7833f28ef0c99d40';
  // private conditionsUrl = 'http://api.wunderground.com/api/ebe965a96fa2346b/conditions/q/MN/Osseo.json';
  private forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?zip=55311,us&APPID=08b134e0daf54b3f7833f28ef0c99d40';
  // private forecastUrl = 'http://api.wunderground.com/api/ebe965a96fa2346b/forecast/q/MN/Osseo.json';

  constructor(private http: HttpClient) {
  }

  getConditions(): Observable<any> {
    return this.http.get(this.conditionsUrl);
  }

  getForecast(): Observable<any> {
    return this.http.get(this.forecastUrl);
  }

}
