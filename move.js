'use strict';
// version 0.0.0
class move {
	constructor(options) {
		this.element = options.element || window;
		this.callback = options.callback;

		this.eventEnd;
		this.Listener();
	}

	typeOfMove() {
		let event;
		switch (null) {
			case (window.ontouchmove):
				event = 'touchmove';
				break;
			case (window.onmousemove):
				event = 'mousemove';
				break;
			default: 
				console.log(33);
				throw new Error('Никакого события move нету');
		}
		return event;
	}

	Listener() {
		this.element.addEventListener(this.typeOfMove(),this.callback);
	}
	end() {
		this.element.removeEventListener(this.typeOfMove(),this.callback);
	}
}


