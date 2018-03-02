import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RssService {
  private apiUrl = 'https://rss2json.com/api.json?rss_url=https://www.npr.org/rss/rss.php?id=103943429';

  constructor(private http: HttpClient) {
  }

  getRssDefault(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getRss(url): Observable<any> {
    return this.http.get(url);
  }

  getNprRss(): Observable<any> {
    return this.getRss('https://rss2json.com/api.json?rss_url=https://www.npr.org/rss/rss.php?id=103943429');
  }

  getDisneyRss(): Observable<any> {
    return this.getRss('https://rss2json.com/api.json?rss_url=http://feeds.feedburner.com/disneyparks');
  }

}
