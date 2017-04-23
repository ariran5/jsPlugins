'use strict';
// version 0.0.0
class clickStart {
	constructor(options) {
		this.element = options.element || window;
		this.callback = options.callback;

		this.Listener();
	}

	typeOfEvent() {
		let event;
		switch (null) {
			case (window.ontouchstart):
				event = 'touchstart';
				break;
			case (window.onmousedown):
				event = 'mousedown';
				break;
			default: throw new Error('Никакого события clickStart нету');
		}
		return event;
	}
	Listener() {
		this.element.addEventListener(this.typeOfEvent(),this.callback);
	}

	end() {
		this.element.removeEventListener(this.typeOfEvent(),this.callback);
	}
}


