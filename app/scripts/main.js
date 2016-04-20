/*
	Author: Satya Rohit A
*/

'use strict';

/*
	Send XHR request
*/
var sendGetRequest = function(url, cb){

	var request = new XMLHttpRequest();

	request.onreadystatechange = function() {
	    if (request.readyState == XMLHttpRequest.DONE) {
		    cb(JSON.parse(request.responseText));
	    }
	}
	request.open('GET', url, true);
	request.send(null);

}

/* 
	Add cards to the page
*/
var addDataToScene = function(data){

	var frag = document.createDocumentFragment();

	for(var i=0;i<data.length;i++){
		frag.appendChild(Card.getCardFragment(data[i]));
	}

	var container = document.createElement('div');
	container.className = "container";
	frag.appendChild(container);

	document.getElementsByTagName('section')[0].appendChild(frag);

}


/*
	Setup the scroll animation
*/
var addScrollAnimation = function(data_length){
	
	Animate.scrollCards(document.getElementsByTagName('section')[0], data_length);
	
}

/*
	Setup the page with all it's elements and functionalities
*/
var setupScene = function(data){

	addDataToScene(data);
	addScrollAnimation(data.length);

	window.onresize = function(){
		Animate.removeScrollAnimation();
		setTimeout(function(){
			addScrollAnimation(data.length);
		}, 500);
	}	

}


//Retrieve data and setup the page
sendGetRequest('/data/restaurants.json', setupScene);

