'use strict';
// version 0.0.0
class pageDraw {
	constructor(options) {


		options = options || {};

		this.template = options.render || null;
		this.cache = (options.data) ? this.ajaxCacheControl(options.data) : (Promise.resolve());
		this.callback = options.callback || null;
		this.pos = options.position || null;
		this.element = (options.element || 'div');
		this.class = options.class;

		this.parent = document.createElement(this.element);

		if (this.class) {
			this.parent.className = this.class;
		}
		this.childrenArray = [];
	}

	set data(url) {
		let a = this.ajaxCacheControl(url);
		if (this.cache != a){
			this.chengeCache = true;
			this.drawed = false;
			this.loading = false;
		}

		this.cache = a;
	}

	get data() {
		return this.cache;
	}

	set render(code) {
		this.parent.innerHTML = code;
	}

	get render() {
		return this.parent;
	}

	set children(code) {
		this.childrenArray.push(code);
		this.draw;
	}

	get children() {
		return this.childrenArray;
	}

	set removeChildren(code) {
		for (var i = 0; i < this.childrenArray.length; i++) {
			if (this.childrenArray[i] === code) {

				delete this.childrenArray[i];

				for (var j = i; j < this.childrenArray.length; j++) {
					if (j == this.childrenArray.length) break;
					this.childrenArray[j] = this.childrenArray[j + 1];
				}

				break;
			}
		}
	}

	get removeChildren() {
		return this.childrenArray;
	}


	set position(code) {
		this.drawed = false;
		if (code instanceof Array) {
			this.pos = code;
		} else {
			this.pos = code.split(' ');
		}
	}

	get position() {
		return this.pos;
	}

	get draw() {

		return this.data.then(()=> {
			console.log(this.position);

			console.log(this.position);
			if (!this.drawed) {
			console.log(this.position);
				
				if (this.chengeCache) {
					this.delete;
					this.chengeCache = false;
				}

				if (this.pos[1] instanceof Object) {
			console.log(this.position);
		
					this.pos[1].insertAdjacentElement(this.pos[0] ,this.render);
					this.drawed = true;

				} else {

					var element = document.querySelector(this.pos[1]);

					if (element) {
						element.insertAdjacentElement(this.pos[0] ,this.render);
						this.drawed = true;
					}
				}		
			} else {

				console.log('Не отрисовано');

			}
			if (!!this.children.length) {

				for (var i = 0; i < this.children.length; i++) {
					this.children[i].draw;
				}

			}

		})
		.catch(()=>{
			throw err;
		});

	}

	get delete() {

		if (!!this.children.length) {

			for (var i = this.children.length - 1; i >= 0; i--) {
				this.children[i].delete;
			}

		}

		this.drawed = false;
		return this.parent.remove();
	}





	loadJson(url, options) {
		options = options || {};
		const BASE_URL = location.origin;
		let xhr = new XMLHttpRequest();
		let method = options.method || 'GET';
	
		xhr.open(method, BASE_URL + url, true);
	
		let promise = new Promise((resolve, reject) => {
			xhr.onload = () => {
				if (xhr.status !== 200) {
					reject();

					return;
				}

				this.loading = false;

				try {
					resolve( JSON.parse(xhr.responseText) );
    			} catch (e) {
					resolve( xhr.responseText );
    			}
			};
	
			xhr.onerror = function() {
				reject();
			};
	
			xhr.send();
	    });
	
		return promise
				.catch(function() {
					let error = new Error(xhr.status + ': ' + xhr.statusText);
	
					console.error('Ajax error', error);
	
					throw error;
				});
	}

	ajaxCacheControl(url) {
		//защита от двойного клика
		if (this.loading) return;

		if (!this[url]) {

			this.loading = true;
			this[url] = this.loadJson(url);
			console.log(this[url], url,"скачено");
		}
		return this[url];
	}
}


