'use strict';

var firstdraw = new pageDraw({
	data:'/qqq/pageDrawTest.js',
	element: 'section',
	class: 'qwe'
});


firstdraw.position = ["afterbegin",document.querySelector('main')];

firstdraw.data.then((data)=>{

	firstdraw.render = `
		<header>
			<h2></h2>
			<p>` + data + `</p>
		</header>
		<div>
			<ul>
				<li>1 блок</li>
				<li>1 блок</li>
				<li>1 блок</li>
				<li class="zzzz">1 блок</li>
			</ul>	
		</div>`;

});

firstdraw.draw;

// var secondBlock = new pageDraw({
// 	data:'/qqq/text.txt',
// 	element:'aside',
// 	class:'rfr qerrame'
// });

// secondBlock.position = 'beforebegin .zzzz';

// firstdraw.children = secondBlock;
// secondBlock.data.then((data) => {
// 	secondBlock.render = '<span>' + data + '<span>';
// });


// setTimeout(()=>{

// 	firstdraw.data = '/Component.js';

// 	firstdraw.data.then((data)=>{
// 		firstdraw.render = '<div class="zzzz">2Fucking '+ data +'shit</div>';
	
// 		firstdraw.position = "afterbegin main";
	
// 		firstdraw.draw;
	
// 	});

// },8000);

