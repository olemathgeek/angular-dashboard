import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RssService {
  private apiUrl = 'https://rss2json.com/api.json?rss_url=https://www.npr.org/rss/rss.php?id=103943429';

  constructor(private http: HttpClient) {
  }

  getRss(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

}
