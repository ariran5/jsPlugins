'use strict';

let height = parseInt(document.documentElement.clientHeight);
let width = 120;

new swipe({
    callbackMove: function(e) {
        if (window.ontouchstart === null) {
            var b = this.eventStart.touches[0].clientY - this.eventMove.touches[0].clientY;
        } else {
            var b = this.eventStart.clientY - this.eventMove.clientY;
        }
        if (b<0) b = -b;

        if ( b > height/10) {
            this.badSwipe();
            return;
        }

    },
    callbackEnd: function() {
        if (window.ontouchstart === null) {
            var b = this.eventStart.touches[0].clientX - this.eventEnd.changedTouches[0].clientX;
        } else {
            var b = this.eventStart.clientX - this.eventEnd.clientX;
        }

        if (true) this.badSwipe(); // проверка внешних данных, если будет ошибка то не уберутся обработчики.
                                // например, если переменной еще нет но будет через 1 секунду.

        if ( b > width) {
            console.log('Закрыть');

            return;
        }
        if ( b < -width) {
            console.log('Открыть');

            return;
        }
        
    }
});



new swipe({
    element: document.querySelector('.qweaaa'),
    startElement:document.querySelector('.wer'),
    callbackStart: function() {
        var coords = this.element.getBoundingClientRect();
        this.center = {
            x:coords.left + (coords.right - coords.left)/2,
            y:coords.top + (coords.bottom - coords.top)/2
        }

    },
    callbackMove: function() {
        let x;
        let y;

        if (window.ontouchstart === null) {
            x = this.eventMove.touches[0].clientX;
            y = this.eventMove.touches[0].clientY;
        } else {
            x = this.eventMove.clientX;
            y = this.eventMove.clientY;
        }

        x = x - this.center.x;
        y = y - this.center.y;

        var angle = Math.atan(y/x) * 57.2958; //rad to deg

        switch(true) {
            case (y >= 0 && x >= 0):

            break;
            case (y > 0 && x < 0):
                angle = 180 + angle;
            break;
            case (y <= 0 && x < 0):
                angle = 180 + angle;
            break;
            case (y < 0 && x >= 0):
                angle = 360 + angle;
            break;
        }

        this.angle = Math.round(angle*10)/10;

        this.element.style.transform = 'rotate(' + this.angle + 'deg)';
       //if (b<0) b = -b;

       //if ( b > height/10) {
       //    this.badSwipe();
       //    return;
       //}
       //this.element.style.transform = '-moz-transform:rotate(' + angle + 'deg);';
       //this.element.style.transform = '-ms-transform:rotate(' + angle + 'deg);';
       //this.element.style.transform = '-webkit-transform:rotate(' + angle + 'deg);';
       //this.element.style.transform = '-o-transform:rotate(' + angle + 'deg);';

    },
    callbackEnd: function() {
        if (window.ontouchstart === null) {
            var b = this.eventStart.touches[0].clientX - this.eventEnd.changedTouches[0].clientX;
        } else {
            var b = this.eventStart.clientX - this.eventEnd.clientX;
        }

        if (true) this.badSwipe(); // проверка внешних данных, если будет ошибка то не уберутся обработчики.
                                // например, если переменной еще нет но будет через 1 секунду.

        if ( b > width) {
            console.log('Закрыть');

            return;
        }
        if ( b < -width) {
            console.log('Открыть');

            return;
        }
        
    }
});


<script>
class FormBestPrintbarInputsValidate {
    constructor(){

        document.querySelector('#ss-form').addEventListener('submit',(event)=>{
            this.error = false;

            var submitEvent = event;
            
            var elements = document.querySelectorAll('.red');

            for (var i = 0; i < elements.length; i++) {

                if (!elements[i].querySelector('input:checked')) {
                    elements[i].classList.add('required');
        
                    this.error = true;
                    
                    if (window['qweqweqweqweqweqqwe'+i]) return;
                    window['qweqweqweqweqweqqwe'+i] = true;


                    elements[i].addEventListener('click',function(){
                        if (this.querySelector('input:checked')) {
                            this.classList.remove('required');
                        }
                    });
                    
                }
        
            }
            if (this.error && this.submited) {
                submitEvent.preventDefault();
            } else {
                this.submited = true;
            }
        
        
        });

    }
}



document.addEventListener('DOMContentLoaded',()=>{
    try {
        new FormBestPrintbarInputsValidate();
    } catch (err){
        console.log('В Валидации формы на заполненность ошибка', err);
    }
});
</script>


