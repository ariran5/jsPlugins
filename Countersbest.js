'use strict';
// version 1.0.0
class Counters {
	constructor(options) {

		this.hourStart = 1;
		this.hourEnd = 0;

		this.secondMS = 1000;
		this.minuteMS = 60 * this.secondMS;// * this.secondMS
		this.hourMS = 60 * this.minuteMS;// * this.minuteMS
		this.dayMS = 24 * this.hourMS;// * this.hourMS


		this.now();
		this.searchCounters();

		setInterval(this.now.bind(this),1000);
		setInterval(this.clocksStart.bind(this),1000);

	}

	testVersion() {

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

	searchCounters() {

		let counters = document.querySelectorAll('[data-counters]');

		if (!counters.length) {
		    throw new Error('Нету счетчиков на странице');
		}

		for (var i = 0; i < counters.length; i++) {

			let elements = counters[i].querySelectorAll('[data-counter]');

			if (!elements.length) {
			    console.log(counters[i],'У этого элемента не найдено детей с дата-атрибутом [data-counter]');
			     break;
			}

			for (var q = 0; q < elements.length; ++q) {

				let elem = elements[q];
				let counterType = elem.getAttribute('data-counter');

				if (counterType === 'clock' ||
					counterType === 'text' ||
					counterType === 'progressLine' ||
					counterType === 'progressLineSVG') {

					this.parseCounter(counterType,elem);

				} else {
					console.log(elements[q],'Не верны значения [data-counter="ЗНАЧЕНИЕ"] для элемента, что за тип счетчика?');

				}
			}
		}
	}

	parseCounter(counterType,element) {
		var name = element.getAttribute('data-counter-name');

		if (element.hasAttribute('data-counter-reverse')) {
			var clockMath = 'reverse';
		} else {
			var clockMath = 'noReverse';
		}
		function setStartTime() {
			var startTime = element.getAttribute('data-counter-startTime');
			if (startTime) {
				startTime = startTime.split(':');
				startTime = new Date(this.year,this.month,this.day,+startTime[0],+startTime[1],+startTime[2]);
			} else {
				startTime = this.today;
			}
			return startTime;
		}
		function setTime() {
			var time = element.getAttribute('data-counter-time');
			if (time) {
				time = time.split(':');
				for (var i = 0; i < time.length; i++) {
					time[i] = +time[i];
				}
			} else {
				time = [24,0,0];
			}
			return time;
		}
		function setEndTime() {
			var endTime = element.getAttribute('data-counter-time');
			if (endTime) {
				endTime = endTime.split(':');
				endTime = new Date(+setStartTime.call(this) + ( +endTime[0] * this.hourMS + +endTime[1] * this.minuteMS + +endTime[2] * this.secondMS ));
			} else {
				endTime = this.tomorrow;
			}
			return endTime;
		}

		var counter = {
			element: element,
			clockMath: clockMath,
			iterations: (element.getAttribute('data-counter-iterations') || 1),
			hoursElement: element.querySelector('[data-counter-clock="hours"]'),
			minutesElement: element.querySelector('[data-counter-clock="minutes"]'),
			secondsElement: element.querySelector('[data-counter-clock="seconds"]')
		}

		if ( !(this[counterType] instanceof Array) ) {
			this[counterType] = [];
		}

		if (name) {

			if ( !this[counterType][name] || !(this[counterType][name] instanceof Object) ){
				this[counterType][name] = {};
				this[counterType][name].elements = [];
				this[counterType][name].hoursElements = [];
				this[counterType][name].minutesElements = [];
				this[counterType][name].secondsElements = [];	
				this[counterType].names = [];
			}
			
			for (var key in counter) {

				if (!this[counterType][name].startTime) {
					this[counterType][name].startTime = setStartTime.call(this);
				}

				if (!this[counterType][name].time) {
					this[counterType][name].time = setTime.call(this);
				}

				if (!this[counterType][name].endTime) {
					this[counterType][name].endTime = setEndTime.call(this);
				}

				if (counter[key] === undefined || counter[key] === null) continue;


				if (key == 'endTime') {
					this[counterType][name].elements.push(counter[key]);
					continue;
				}

				if (key == 'element') {
					this[counterType][name].elements.push(counter[key]);
					continue;
				}
				if (key == 'hoursElement') {
					this[counterType][name].hoursElements.push(counter[key]);
					continue;
				}
				if (key == 'minutesElement') {
					this[counterType][name].minutesElements.push(counter[key]);
					continue;
				}
				if (key == 'secondsElement') {
					this[counterType][name].secondsElements.push(counter[key]);
					continue;
				}

				
				if (!this[counterType][name][key]) {
					this[counterType][name][key] = counter[key];
					continue;
				}

				this.errorMessage = {
					element: counter.element,
					key:key,
					message:'Если у счетчиков одно и то же имя, то достаточно добавить дата-атрибуты только для одного счетчика.'
				};

			}

			for (var a in this.errorMessage) {
			//	console.log(this.errorMessage[a])
			}

			if (!this[counterType].names.length) {
				this[counterType].names.push(name);
				return;
			}

			for (var i = 0; i < this[counterType].names.length; i++) {

				if (this[counterType].names[i] == name ) break;

				if (i == this[counterType].names.length - 1) this[counterType].names.push(name);
			}



			return;
		}

		counter.startTime = setStartTime.call(this);
		counter.endTime = setEndTime.call(this);
		counter.time = setTime.call(this);


		this[counterType].push(counter);
			console.dir(this[counterType]);
			console.log(this[counterType].names);
			console.log(this[counterType]);
	}


	clocksStart() {
		for (var i = 0; i < this.clock.length; i++) {

			if (+this.date < +this.clock[i].startTime) continue;

			var secStart  = this.clock[i].startTime.getSeconds();
			var minStart  = this.clock[i].startTime.getMinutes();
			var hourStart = this.clock[i].startTime.getHours();


			console.log(this.clock[i].time[2]);
			console.log(this.clock[i].time[1]);
			console.log(this.clock[i].time[0]);

			var startMS = secStart * this.secondMS + minStart * this.minuteMS + hourStart * this.hourMS;
			var nowMS = this.seconds * this.secondMS + this.minutes * this.minuteMS + this.hour * this.hourMS;
			var iterationMS = this.clock[i].time[0] * this.hourMS + this.clock[i].time[1] * this.minuteMS + this.clock[i].time[2] * this.secondMS;

			var a = (+this.date - +this.clock[i].startTime)/iterationMS;

			console.log(+this.date);
			console.log(+this.clock[i].startTime);
			console.log(a);

			var sec = this.seconds + secStart + this.clock[i].time[2] * Math.floor(a);
			var min = this.minutes + minStart + this.clock[i].time[1] * Math.floor(a);

			if (sec > 0) {
				sec = sec % 60;
				min = min + Math.floor(sec/60) - secStart  ;
			}


			console.log(sec);


			
			if (min < 0) {
				min = - min;
			}
			if (min > 0) {
				min = min % 60;
				hour = hour + Math.floor(sec/60);
			}

			var hour = (this.hour - hourStart) % this.clock[i].time[0];

			this.clock[i].secondsElement.innerHTML = sec;
			this.clock[i].minutesElement.innerHTML = min;
			this.clock[i].hoursElement.innerHTML = hour;
		}

	//for (var i = 0; i < this.clock.names.length; i++) {
	//	var clockName =  this.clock[this.clock.names[i]]
	//	for (var i = 0; i < clockName.length; i++) {

	//		var counterTime = new Date( this.date - this.startTime );
	//		this.hoursElement.innerHTML = counterTime.getHours();
	//		this.minutesElement.innerHTML = counterTime.getMinutes();
	//		this.secondsElement.innerHTML = counterTime.getSeconds();

	//		for (var i = 0; i < clockName.elements.length; i++) {
	//			clockName[i]
	//		}

	//	}
	//	
	//}
	}


	__singleClockMath(date) {
		var counterTime = new Date( date - this.startTime );
		this.hoursElement.innerHTML = counterTime.getHours();
		this.minutesElement.innerHTML = counterTime.getMinutes();
		this.secondsElement.innerHTML = counterTime.getSeconds();
	}

	__clockMathReverse(date) {
		var counterTime = new Date( this.endTime - date );
		this.hoursElement.innerHTML = counterTime.getHours();
		this.minutesElement.innerHTML = counterTime.getMinutes();
		this.secondsElement.innerHTML = counterTime.getSeconds();
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
	clocsak(element) {

		this.clocks 

		let clockTime;

		(element.hasAttribute('data-counter-clock-reverse')) ?
			clockTime = this.__clockMathReverse:
			clockTime = this.__clockMath;

		let hours = element.querySelector('[data-counter-clock="hours"]');
		let minutes = element.querySelector('[data-counter-clock="minutes"]');
		let seconds = element.querySelector('[data-counter-clock="seconds"]');

		function startClock() {

			let a = clockTime.call(this);
			a = this.__clockDesign(a);
			hours.innerHTML = a[0];
			minutes.innerHTML = a[1];
			seconds.innerHTML = a[2];
		}

		startClock.call(this);

		setInterval(()=>{
			startClock.call(this);
		},1000);
	}

	__clockDesign(time) {

		if (time[0] < 10 && time[0] >= 0) time[0] = '0' + time[0];

		if (time[1] < 10 && time[1] >= 0) time[1] = '0' + time[1];

		if (time[2] < 10 && time[2] >= 0) time[2] = '0' + time[2];
		
		return [time[0],time[1],time[2]];
	}

	__clockReverseDesign(time) {
		if (time[2] == 60) {
			time[2] = 0;
		} else time[1]--;
		if (time[1] == 60) {
			time[1] = 0;
		}else time[0]--;
		if (time[0] == 24) {
			time[0] = 0;
		}
		return [time[0],time[1],time[2]];
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

	stop() {

	}


}
document.addEventListener('DOMContentLoaded',()=>{
	try{
		new Counters();
	} catch (err) {
		console.log(err);
	}
});


// API {
//	   parent: {
//         data-counter
//         
//         counters: {
//              progressLine: {
//                  data-counter="progressLine"
//              }

//              progressLineSVG: {
//                  data-counter="progressLineSVG"
//              }
            
//              text: {
//                  data-counter="text"
//              }
            
//              clock: {
//                  parent: {
//                      data-counter="clock" // + data-counter-clock-reverse
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

//	
//
//
//

