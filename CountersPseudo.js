'use strict';
class CountersPseudo {
    constructor(options) {
        this.now();

        this.maxItems = 50;

        function getCookie(name) {
          var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
          ));
          return matches ? decodeURIComponent(matches[1]) : undefined;
        }
        getCookie('CounterPseudo');

        this.items = getCookie('CounterPseudo') ? getCookie('CounterPseudo') : this.maxItems - this.hour * 1.5;

        this.progress();
        this.start();

        setInterval(() =>{
            this.now();
            this.progress();
        },1000);

        this.__calculate()
    }

    progress() {
        // 1 -> 0 

        this.progressValue = this.items / this.maxItems;

    }

    __calculate() {
        this.start();
        let intervalTime;

        switch (true) {
            case (this.progressValue <= 1 && this.progressValue > 0.9):

                    intervalTime = Math.random() * 14e3; //ms

                    clearTimeout(this.TimeOut);
                    this.TimeOut = setTimeout(function() {
                        this.items--;
                        this.__calculate();
                    }.bind(this),intervalTime);
                break;

            case (this.progressValue <= 0.9 && this.progressValue > 0.5):

                    intervalTime = Math.random() * 1e5 + 5e4; //ms

                    clearTimeout(this.TimeOut);
                    this.TimeOut = setTimeout(function() {
                        this.items--;
                        this.__calculate();
                    }.bind(this),intervalTime);
                break;

            case (this.progressValue <= 0.5 && this.progressValue > 0.08):

                    intervalTime = Math.random() * 1e5 + 2e4; //ms

                    clearTimeout(this.TimeOut);
                    this.TimeOut = setTimeout(function() {
                        this.items--;
                        this.__calculate();
                    }.bind(this),intervalTime);
                break;

            default: clearTimeout(this.TimeOut);
        }

        document.cookie = "CounterPseudo="+Math.round(this.items)+"; expires="+this.tomorrow.toUTCString()+"; path=/";
    }

    start() {

        let counters = document.querySelectorAll('[data-counter]');

        if (!counters) return;

        for (var i = 0; i < counters.length; i++) {

            let elements = counters[i].querySelectorAll('[data-counter-element]');

            for (var q = 0; q < elements.length; ++q) {
                let elem = elements[q];
                let counterType = elem.dataset.counterElement;
                switch (counterType) {

                    case 'text': 
                        
                        this.text(elem);
                        
                        break;

                    case 'progressLine':
                        
                        this.progressLine(elem);
                        
                        break;

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
    }


    progressLine(element) {
        let lineLength = 100 * this.progressValue;
        element.style.width = (lineLength < 6 ? 6 : 100 * this.progressValue) + '%';
    }

    text(element) {
        let items = Math.round(this.maxItems * this.progressValue);
        element.innerHTML = items < 3? 3 : items;
    }


}

    new CountersPseudo();



