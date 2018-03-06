import { Component } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { RssService } from './rss.service';

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

	constructor(private st: SimpleTimer, private rssService: RssService) { }

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
	// http://api.wunderground.com/api/ebe965a96fa2346b/conditions/q/MN/Osseo.json
	}

	timer60callback() {
	//every 1 minutes
		this.printDate = new Date()//.format('D, M d, Y');
	 	this.rssService.getNprRss().toPromise().then(data => {
			this.npr = data.items;
			console.log('npr:');
			console.log(data);
  		});
	 	this.rssService.getDisneyRss().toPromise().then(data => {
        	this.disney = data.items;
			console.log('disney:');
			console.log(data);
  		});
	}

}
