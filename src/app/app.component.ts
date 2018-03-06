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
		this.st.newTimer('1sec',1);
		this.st.newTimer('300sec',300);
		this.st.newTimer('60sec',60);
		this.subscribeTimer1();
		this.subscribeTimer300();
		this.subscribeTimer60();
	}

	subscribeTimer1() {
		this.st.subscribe('1sec', () => this.timer1callback());
	}

	subscribeTimer300() {
		this.st.subscribe('300sec', () => this.timer300callback());
	}

	subscribeTimer60() {
		this.st.subscribe('60sec', () => this.timer60callback());
	}

	timer1callback() {
	// //every 1 seconds
	  this.printDate = new Date();
	}

	timer300callback() {
	// every 5 minutes
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

	timer60callback() {
	//every 1 minutes
		this.printDate = new Date()//.format('D, M d, Y');
	 	this.rssService.getNprRss().toPromise().then(data => {
			this.npr = data.items;
  		});
	 	this.rssService.getDisneyRss().toPromise().then(data => {
        	this.disney = data.items;
  		});
	}

}
