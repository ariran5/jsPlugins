'use strict';
// version 0.0.0
// need clickStart.js move.js clickEnd.js
class swipe {
	constructor(options) {
		this.element = options.element || window;
		this.startElement = options.startElement || this.element;
		this.callbackStart = options.callbackStart || function(){};
		this.callbackMove = options.callbackMove;
		this.callbackEnd = options.callbackEnd;

		this.Listener();
	}

	Listener() {
		this.a = new clickStart({
			element: this.startElement,
			callback: (eventStart) => {
				this.eventStart = eventStart;
				this.callbackStart(eventStart);

				this.b = new move({
					callback:(eventMove) => {
						this.eventMove = eventMove;
						this.callbackMove(eventMove);
					}
				});

				this.c = new clickEnd({
					callback:(eventEnd)=>{
						this.eventEnd = eventEnd;

						this.callbackEnd(eventEnd);
						this.badSwipe();
					}
				});
			}
		});
	}

	badSwipe() {
		this.b.end();
		this.c.end();
	}
}


