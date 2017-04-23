'use strict';
// version 0.0.0
class clickEnd {
	constructor(options) {
		this.element = options.element || window;
		this.callback = options.callback;

		this.eventEnd;
		this.Listener();
	}

	typeOfClick() {
		let event;
		switch (null) {
			case (window.ontouchend):
				event = 'touchend';
				break;
			case (window.onmouseup):
				event = 'mouseup';
				break;
			default: throw new Error('Никакого события click нету');
		}
		return event;
	}
	Listener() {
		this.element.addEventListener(this.typeOfClick(),this.callback);
	}
	end() {
		this.element.removeEventListener(this.typeOfClick(),this.callback);
	}
}


