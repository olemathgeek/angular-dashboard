import { Component } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { RssService } from './rss.service';
import { WeatherService } from './weather.service';
import { DateTime } from '@wazio/date-time';

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
		this.printDate = DateTime.format(new Date(), 'M/d/yyyy');
		this.printTime = DateTime.format(new Date(), 'h:mm:ss tt');
	}

	timerWeatherCallback() {
		this.weatherService.getForecast().toPromise().then(data => {
			// this is for sentences forecasts
			// if(data && data.forecast && data.forecast.txt_forecast){
			//	this.forecast = data.forecast.txt_forecast.forecastday
			//	    .filter((item, index) => index < 4 );
			//	console.log('forecast:');
			//	console.log(data);
			// }
			if(data && data.forecast && data.forecast.simpleforecast){
				this.forecast = data.forecast.simpleforecast.forecastday
						.filter((item, index) => index < 4 );
				// console.log('forecast:');
				// console.log(this.forecast);
			}
	  });
		this.weatherService.getConditions().toPromise().then(data => {
			this.conditions = data.current_observation;
			// console.log('conditions:');
			// console.log(this.conditions);
	  });

}

	timerNewsCallback() {
		//this.printDate = new Date()//.format('D, M d, Y');
	 	this.rssService.getNprRss().toPromise().then(data => {
			this.npr = data.items
				.sort(this.sortByPubDate)
				.filter((item, index) => index < 2 );
  		});
	 	this.rssService.getDisneyRss().toPromise().then(data => {
					this.disney = data.items
						.filter((item, index) => item.title.indexOf('ICYMI') === -1)
        		.sort(this.sortByPubDate)
        		.filter((item, index) => index < 2 );
        	for(const entry of this.disney){
        		const picIndex = entry.title.indexOf('pic.twitter.com');
        		if(picIndex > -1){
        			entry.title = entry.title.substring(0, picIndex);
        		}

        		const urlIndex = entry.title.indexOf('http');
        		if(urlIndex > -1){
        			entry.title = entry.title.substring(0, urlIndex);
        		}
        	}
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
