'use strict';

const BASE_URL = location.origin;

class Component {
	constructor(element) {
		this.el = element;
	}

	getElement() {
		return this.el;
	}

	addDataChengePage(pageName) {
		let a = 'data-js-change-page="' + pageName + '"';
		return a;
	}

  // __animatePromise(animateFadeOut,animateFadeIn) {
  //   let promise = new Promise(function(resolve,reject){
  //     animateFadeOut();

  //     this.el.addEventListener('transitionend',fuction(){
  //       animateFadeIn();


  //       resolve();
  //     }.bind(this));
  //   }.bind(this));

  //   return promise;
  // }
	fadeAnimated(elem,anim){
		elem.classList.remove('hidden');
		elem.classList.add(anim);
		elem.classList.add('animated');
	
		elem.addEventListener('webkitAnimationEnd',function f(){
			this.classList.remove('animated');
			this.classList.remove(anim);
			this.removeEventListener('webkitAnimationEnd',f);
		});
		elem.addEventListener('animationEnd',function f(){
			this.classList.remove('hidden');
			this.classList.remove('animated');
			this.classList.remove(anim);
			this.removeEventListener('animationEnd',f);
		});
	}
	hideAnimated(elem,anim){
		elem.classList.add(anim);
		elem.classList.add('animated');
	
		elem.addEventListener('webkitAnimationEnd',function f(){
			this.classList.add('hidden');
			this.classList.remove('animated');
			this.classList.remove(anim);
			this.removeEventListener('webkitAnimationEnd',f);
		});
		elem.addEventListener('animationEnd',function f(){
			this.classList.add('hidden');
			this.classList.remove('animated');
			this.classList.remove(anim);
			this.removeEventListener('animationEnd',f);
		});
	}

	loadJson(url, options) {
		options = options || {};
	
		let xhr = new XMLHttpRequest();
		let method = options.method || 'GET';
	
		xhr.open(method, BASE_URL + url, true);
	
		let promise = new Promise(function(resolve, reject) {
			xhr.onload = function() {
				if (xhr.status !== 200) {
					reject();
	
					return;
				}
	
				resolve( JSON.parse(xhr.responseText) );
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
		if (this[url] === 1) return;

		if (!this[url]) {
			this[url] = 1;
			this[url] = this.loadJson(url);
			console.log(this[url], url,"скачено");
		}
		return this[url];
	}
};


