import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RssService {
  private rootUrl = 'https://rss2json.com/api.json?rss_url=';

  constructor(private http: HttpClient) {
  }

  getRss(url): Observable<any> {
    return this.http.get(url);
  }

  getNprRss(): Observable<any> {
    return this.getRss('https://www.npr.org/feeds/1001/feed.json');
    // return this.getRss(this.rootUrl + 'https://www.npr.org/rss/rss.php?id=1001');
    // BROKEN return this.getRss(this.rootUrl + 'https://www.npr.org/rss/rss.php?id=103943429');
  }

  getDisneyRss(): Observable<any> {
    return this.getRss(this.rootUrl + 'https://twitrss.me/twitter_user_to_rss/?user=wdwnt');
  }

  getDisneyRssOld(): Observable<any> {
    return this.getRss(this.rootUrl + 'http://feeds.feedburner.com/disneyparks');
  }



}
