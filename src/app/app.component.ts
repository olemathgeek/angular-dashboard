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

	counter0 = 0;
	timer0Id: string;
	timer0button = 'Subscribe';

	counter1 = 0;
	timer1Id: string;
	timer1button = 'Subscribe';

	counter2 = 0;
	timer2Id: string;
	timer2button = 'Subscribe';

	constructor(private st: SimpleTimer, private rssService: RssService) { }

	ngOnInit() {
		this.st.newTimer('1sec',1);
		this.st.newTimer('300sec',300);
		this.st.newTimer('60sec',60);
		this.subscribeTimer0();
		this.subscribeTimer1();
		this.subscribeTimer2();
	}

	delAllTimer() {
		this.st.delTimer('1sec');
		this.st.delTimer('5sec');
		this.st.delTimer('10sec');
	}

	subscribeTimer0() {
		if (this.timer0Id) {
			// Unsubscribe if timer Id is defined
			this.st.unsubscribe(this.timer0Id);
			this.timer0Id = undefined;
			this.timer0button = 'Subscribe';
			console.log('timer 0 Unsubscribed.');
		} else {
			// Subscribe if timer Id is undefined
			this.timer0Id = this.st.subscribe('1sec', () => this.timer0callback());
			this.timer0button = 'Unsubscribe';
			console.log('timer 0 Subscribed.');
		}
		console.log(this.st.getSubscription());
	}

	subscribeTimer1() {
		if (this.timer1Id) {
			// Unsubscribe if timer Id is defined
			this.st.unsubscribe(this.timer1Id);
			this.timer1Id = undefined;
			this.timer1button = 'Subscribe';
			console.log('timer 1 Unsubscribed.');
		} else {
			// Subscribe if timer Id is undefined
			this.timer1Id = this.st.subscribe('5sec', () => this.timer1callback());
			this.timer1button = 'Unsubscribe';
			console.log('timer 1 Subscribed.');
		}
		console.log(this.st.getSubscription());
	}

	subscribeTimer2() {
		if (this.timer2Id) {
			// Unsubscribe if timer Id is defined
			this.st.unsubscribe(this.timer2Id);
			this.timer2Id = undefined;
			this.timer2button = 'Subscribe';
			console.log('timer 2 Unsubscribed.');
		} else {
			// Subscribe if timer Id is undefined
			this.timer2Id = this.st.subscribe('10sec', () => this.timer2callback());
			this.timer2button = 'Unsubscribe';
			console.log('timer 2 Subscribed.');
		}
		console.log(this.st.getSubscription());
	}

	timer0callback() {
	//every 1 seconds
	  this.printDate = new Date();
		this.counter0++;
	}

	timer1callback() {
	//every 5 minutes
	//http://api.wunderground.com/api/ebe965a96fa2346b/conditions/q/MN/Osseo.json
		this.counter1++;
	}

	timer2callback() {
	//every 1 minutes
		this.printDate = new Date()//.format('D, M d, Y');
	 	this.rssService.getNprRss().toPromise().then(data => {
        	this.npr = data.items;
  		});
	 	this.rssService.getDisneyRss().toPromise().then(data => {
        	this.disney = data.items;
        	console.log(data.items);
  		});
	 

		this.counter2++;
	}


}
