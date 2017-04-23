'use strict';
// version 0.2.5

//проблемы. Нельзя ставить время счетчика на 24:0:0

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Counters = function () {
	function Counters(options) {
		_classCallCheck(this, Counters);

		this.hourStart = 1;
		this.hourEnd = 0;

		this.secondMS = 1;
		this.minuteMS = 60; // * this.secondMS
		this.hourMS = 60; // * this.minuteMS
		this.dayMS = 24; // * this.hourMS


		this.actionTime = this.dayMS - this.hourStart + this.hourEnd;

		this.now();
		this.start();
		setInterval(this.now.bind(this), 1000);

		this.counters = [];
	}

	_createClass(Counters, [{
		key: 'start',
		value: function start() {
			var _this = this;

			var counters = document.querySelectorAll('[data-counter]');

			if (!counters.length) {
				throw new Error('Нету счетчиков на странице');
			}

			for (var i = 0; i < counters.length; i++) {

				var elements = counters[i].querySelectorAll('[data-counter-element]');

				if (!elements.length) {
					console.log('Нужно проставить [data-counter-element] на элементы, которые являются счетчиками ');
				}

				var _loop = function _loop() {
					var elem = elements[q];
					var counterType = elem.getAttribute('data-counter-element');
					switch (counterType) {

						case 'clock':
							_this.clock(elem);
							break;

						case 'text':
							_this.text(elem);

							setInterval(function () {

								_this.text(elem);
							}, _this.minuteMS * 1000);

							break;

						case 'progressLine':

							_this.progressLine(elem);

							setInterval(function () {

								_this.progressLine(elem);
							}, _this.minuteMS * 1000);

							break;
						case 'progressLineSVG':
							_this.progressLineSVG(elem);

							setInterval(function () {

								_this.progressLineSVG(elem);
							}, _this.minuteMS * 1000);

							break;

						default:
							console.log('Не верны значения [data-counter-element="ЗНАЧЕНИЕ"] для элемента ' + ('.' + elements[q].className + '#' + elements[q].id));

					}
				};

				for (var q = 0; q < elements.length; ++q) {
					_loop();
				}
			}
		}
	}, {
		key: 'now',
		value: function now() {
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
	}, {
		key: 'progress',
		value: function progress() {
			// 1 -> 0 
			if (this.hour > this.hourEnd && this.hour < this.hourStart) {
				this.progressValue = 1;
				return;
			}

			if (this.hour < 1) {
				this.progressValue = (this.dayMS * this.minuteMS - 1 * this.minuteMS - this.minutes) / (this.actionTime * this.minuteMS);
				return;
			}

			this.progressValue = (this.dayMS * this.minuteMS - this.hour * this.minuteMS - this.minutes) / (this.actionTime * this.minuteMS);
		}
	}, {
		key: 'clock',
		value: function clock(element) {

			var reverse = element.hasAttribute('data-counter-clock-reverse') ? true : false;
			var size = element.getAttribute('data-counter-clock-size');
			size = size ? size : 24;

			var time = element.hasAttribute('data-counter-clock-time');
			if (!!time) {
				time = element.getAttribute('data-counter-clock-time');
				time = time.split(':');

				var timeInit = new Date();
				time[2] = +timeInit.getSeconds() + +time[2];
				time[1] = +timeInit.getMinutes() + +time[1];
				time[0] = +timeInit.getHours() + +time[0];
			}
			var options = {};
			options.size = size;
			options.time = time;

			var clockTime = void 0;
			if (reverse) {
				clockTime = this.__clockMathReverse;
			} else {
				clockTime = this.__clockMath;
			}

			var hours = element.querySelector('[data-counter-clock="hours"]');
			var minutes = element.querySelector('[data-counter-clock="minutes"]');
			var seconds = element.querySelector('[data-counter-clock="seconds"]');

			function startClock() {

				var a = clockTime.call(this, options);
				a = this.__clockDesign(a);
				if (a[0] < 0) {
					clearInterval(qwe);
					return;
				}
				hours.innerHTML = a[0];
				minutes.innerHTML = a[1];
				seconds.innerHTML = a[2];
			}

			var qwe = setInterval(startClock.bind(this), 1000);
		}
	}, {
		key: '__clockDesign',
		value: function __clockDesign(time) {

			if (time[0] < 10 && time[0] >= 0) time[0] = '0' + time[0];

			if (time[1] < 10 && time[1] >= 0) time[1] = '0' + time[1];

			if (time[2] < 10 && time[2] >= 0) time[2] = '0' + time[2];

			return [time[0], time[1], time[2]];
		}
	}, {
		key: '__clockMath',
		value: function __clockMath(options) {
			var hour = this.hour % options.size;
			return [hour, this.minutes, this.seconds];
		}
	}, {
		key: '__clockMathReverse',
		value: function __clockMathReverse(options) {
			var fullTime = void 0;

			if (options.time) {
				var seconds = options.time[2] - this.seconds;
				var minutes = options.time[1] - this.minutes;
				var hours = (options.time[0] - this.hour) % options.size;
			} else {
				var seconds = this.minuteMS - 1 - this.seconds;
				var minutes = this.hourMS - 1 - this.minutes;
				var hours = (this.dayMS - 1 - this.hour) % options.size;
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
			} else if (minutes > 60) {
				hours++;
				minutes -= 60;
			} else if (minutes == 60) {
				hours++;
				minutes = 0;
			}
			fullTime = [hours, minutes, seconds];

			return fullTime;
		}
	}, {
		key: 'progressLine',
		value: function progressLine(element) {
			var lineLength = 100 * this.progressValue;
			element.style.width = (lineLength < 4 ? 4 : 100 * this.progressValue) + '%';
		}
	}, {
		key: 'progressLineSVG',
		value: function progressLineSVG(element) {
			var paths = element.querySelectorAll('path');
			for (var i = 0; i < paths.length; i++) {
				var a = paths[i].getTotalLength();
				paths[i].style.strokeDasharray = a;

				if (element.hasAttribute('data-counter-progresslinesvg-reverse')) {
					paths[i].style.strokeDashoffset = a - a * this.progressValue;
				} else {

					paths[i].style.strokeDashoffset = a * this.progressValue;
				}
			}
		}
	}, {
		key: 'progressLineMath',
		value: function progressLineMath() {}
	}, {
		key: 'progressLineMathReverse',
		value: function progressLineMathReverse() {}
	}, {
		key: 'text',
		value: function text(element) {
			var maxItems = 50;
			var items = Math.round(maxItems * this.progressValue);
			element.innerHTML = items < 3 ? 3 : items;
		}
	}]);

	return Counters;
}();

document.addEventListener('DOMContentLoaded', function () {
	try {
		new Counters();
	} catch (err) {
		console.log(err.message);
	}
});