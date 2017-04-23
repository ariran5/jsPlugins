'use strict';
// version 0.2.6

//проблемы. Нельзя ставить время счетчика на 24:0:0
class Counters {
	constructor(options) {

		this.hourStart = 1;
		this.hourEnd = 0;

		this.secondMS = 1;
		this.minuteMS = 60;// * this.secondMS
		this.hourMS = 60;// * this.minuteMS
		this.dayMS = 24;// * this.hourMS


		this.actionTime = this.dayMS - this.hourStart + this.hourEnd;


		this.now();
		this.start();
		setInterval(this.now.bind(this),1000);

		this.counters = [];

	}

	start() {

		let counters = document.querySelectorAll('[data-counter]');

		if (!counters.length) {
		    throw new Error('Нету счетчиков на странице');
		}

		for (var i = 0; i < counters.length; i++) {


			let elements = counters[i].querySelectorAll('[data-counter-element]');

			if (!elements.length) {
			    console.log('Нужно проставить [data-counter-element] на элементы, которые являются счетчиками ');
			}

			for (var q = 0; q < elements.length; ++q) {
				let elem = elements[q];
				let counterType = elem.getAttribute('data-counter-element');
				switch (counterType) {

					case 'clock':
							this.clock(elem);
						break;

					case 'text': 
						this.text(elem);
						
						setInterval(() => {

							this.text(elem);

						},this.minuteMS * 1000);
						
						break;

					case 'progressLine':
						
						this.progressLine(elem);
						
						setInterval(() => {

							this.progressLine(elem);

						},this.minuteMS * 1000);
						
						break;
					case 'progressLineSVG':
						this.progressLineSVG(elem);

						setInterval(() => {

							this.progressLineSVG(elem);

						},this.minuteMS * 1000);
						
						break;

					default: 
						console.log('Не верны значения [data-counter-element="ЗНАЧЕНИЕ"] для элемента ',elements[q] );

				}
			}
		}
	}

	now() {
		this.date = new Date();
		this.year = this.date.getFullYear();
		this.month = this.date.getMonth();
		this.day = this.date.getDate();
		this.hour = this.date.getHours();
		this.minutes = this.date.getMinutes();
		this.seconds = this.date.getSeconds();
		this.yesterday = new Date(this.year, this.month, this.day - 1);
		this.today = new Date(this.year, this.month, this.day);
		this.tomorrow = new Date(this.year, this.month, this.day + 1);
		this.progress();
	}

	progress() {
	// 1 -> 0 
		if (this.hour > this.hourEnd && this.hour < this.hourStart) {
			this.progressValue = 1;
			return;
		}

		if (this.hour < 1) {
			this.progressValue = (this.dayMS * this.minuteMS - 1 * this.minuteMS - this.minutes)/(this.actionTime * this.minuteMS);
			return;
		}

		this.progressValue = (this.dayMS * this.minuteMS - this.hour * this.minuteMS - this.minutes)/(this.actionTime * this.minuteMS);

	}

	clock(element) {

		let reverse = (element.hasAttribute('data-counter-clock-reverse')) ? true : false;
		let size = element.getAttribute('data-counter-clock-size');
			size = (size) ? size : 24;


		let time = element.hasAttribute('data-counter-clock-time');
		if (!!time) {
			time = element.getAttribute('data-counter-clock-time');
			time = time.split(':');			

		let timeInit = new Date();
			time[2] = +timeInit.getSeconds() + +time[2];
			time[1] = +timeInit.getMinutes() + +time[1];
			time[0] = +timeInit.getHours() + +time[0];

		}
		let options = {};
			options.size = size;
			options.time = time;

		let clockTime;
		if (reverse) {
			clockTime = this.__clockMathReverse;
		} else {
			clockTime = this.__clockMath;
		}

		let hours = element.querySelector('[data-counter-clock="hours"]');
		let minutes = element.querySelector('[data-counter-clock="minutes"]');
		let seconds = element.querySelector('[data-counter-clock="seconds"]');

		function startClock() {

			let a = clockTime.call(this,options);
			a = this.__clockDesign(a);
			if (a[0] < 0) {
				clearInterval(qwe);
				return;
			}
			hours.innerHTML = a[0];
			minutes.innerHTML = a[1];
			seconds.innerHTML = a[2];
		}


		var qwe = setInterval(startClock.bind(this),1000);
	}

	__clockDesign(time) {

		if (time[0] < 10 && time[0] >= 0) time[0] = '0' + time[0];

		if (time[1] < 10 && time[1] >= 0) time[1] = '0' + time[1];

		if (time[2] < 10 && time[2] >= 0) time[2] = '0' + time[2];
		
		return [time[0],time[1],time[2]];
	}

	__clockMath(options) {
			let hour = this.hour % options.size;
		return [hour,this.minutes,this.seconds];
	}

	__clockMathReverse(options) {
		let fullTime;

		if (options.time) {
			var seconds = options.time[2] - this.seconds;
			var minutes = options.time[1] - this.minutes;
			var hours = (options.time[0] - this.hour) % options.size;
		} else {
			var seconds = this.minuteMS-1 - this.seconds;
			var minutes = this.hourMS-1 - this.minutes;
			var hours = (this.dayMS-1 - this.hour) % options.size;

		}
		if (seconds < 0) {
			minutes--;
			seconds += 60;
		} else if (seconds > 60) {
			minutes++;
			seconds -= 60;
		} else if (seconds == 60) {
			minutes++;
			seconds = 0;
		}
		if (minutes < 0) {
			hours--;
			minutes += 60;
		}else if (minutes > 60) {
			hours++;
			minutes -= 60;
		}else if (minutes == 60) {
			hours++;
			minutes = 0;
		}
		fullTime = [hours,minutes,seconds];

		return fullTime;
	}


	progressLine(element) {
		let lineLength = 100 * this.progressValue;
		element.style.width = (lineLength < 4 ? 4 : 100 * this.progressValue) + '%';
	}

	progressLineSVG(element) {
		let paths = element.querySelectorAll('path');
		for (var i = 0; i < paths.length; i++) {
			let a = paths[i].getTotalLength();
					paths[i].style.strokeDasharray = a;

			if (element.hasAttribute('data-counter-progresslinesvg-reverse')) {
					paths[i].style.strokeDashoffset = a - a * this.progressValue;
				}else {
	
				paths[i].style.strokeDashoffset = a * this.progressValue;
			}
		}
	}
	progressLineMath() {

	}
	progressLineMathReverse() {
	
	}
	text(element) {
		let maxItems = 50;
		let items = Math.round(maxItems * this.progressValue);
		element.innerHTML = items < 3? 3 : items;
	}


}
document.addEventListener('DOMContentLoaded',()=>{
	try{
		new Counters();
	} catch (err) {
		console.log(err.message);
	}
});


// API {
//	   parent: {
//         data-counter
//         
//         counters: {
//              progressLine: {
//                  data-counter-element="progressLine"
//					data-counter-line-reverse
//              }

//              progressLineSVG: {
//                  data-counter-element="progressLineSVG"
//					data-counter-line-reverse
//              }
            
//              text: {
//                  data-counter-element="text"
//              }
            
//              clock: {
//                  parent: {
//                      data-counter-element="clock" // + data-counter-clock-reverse
//                  }
            
//                  children: {
//                      data-counter-clock="hours"
//                      data-counter-clock="minutes"
//                      data-counter-clock="seconds"
//                  }
//              }
//          }
//     }

// }
