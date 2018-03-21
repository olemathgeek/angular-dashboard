import { Component } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { RssService } from './rss.service';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'app';

	printDate:any = 'abc';
	printTime:any = 'time';
	npr = [];
	disney = [];
	forecast = [];
	conditions = [];

	constructor(private st: SimpleTimer, private rssService: RssService,
		private weatherService: WeatherService) { }

	ngOnInit() {
		this.st.newTimer('dateTime',1);
		this.st.newTimer('weather',600);
		this.st.newTimer('news',60);
		this.subscribeTimerDateTime();
		this.subscribeTimerWeather();
		this.subscribeTimerNews();
	}

	subscribeTimerDateTime() {
		this.st.subscribe('dateTime', () => this.timerDateTimeCallback());
	}

	subscribeTimerWeather() {
		this.st.subscribe('weather', () => this.timerWeatherCallback());
	}

	subscribeTimerNews() {
		this.st.subscribe('news', () => this.timerNewsCallback());
	}

	timerDateTimeCallback() {
	  this.printDate = new Date();
	}

	timerWeatherCallback() {
	this.weatherService.getForecast().toPromise().then(data => {
		this.forecast = data.forecast;
		console.log('forecast:');
		console.log(this.forecast);
	  });
	this.weatherService.getConditions().toPromise().then(data => {
		this.conditions = data.current_observation;
		console.log('conditions:');
		console.log(this.conditions);
	  });

}

	timerNewsCallback() {
		//this.printDate = new Date()//.format('D, M d, Y');
	 	this.rssService.getNprRss().toPromise().then(data => {
			this.npr = data.items
				.sort(this.sortByPubDate)
				.filter((item, index) => index < 3 );
  		});
	 	this.rssService.getDisneyRss().toPromise().then(data => {
	 		console.log(data.items);
        	this.disney = data.items
        		.sort(this.sortByPubDate)
        		.filter((item, index) => index < 3 );
  		});
	}

	sortByPubDate(a,b) {
		if (a.pubDate > b.pubDate) {
		    return -1;
		}
		if (a.pubDate < b.pubDate) {
			return 1;
		}

		// names must be equal
		return 0;
	}
}
