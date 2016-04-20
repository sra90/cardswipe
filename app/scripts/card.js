/*
	Create cards along will all it's data
*/
var Card = (function(){

	'use strict';

	var card = '<div class="card"> \
			      <div class="top"> \
			        <strong class="love"> \
			          <span class="fa fa-heart"></span> \
			        </strong> \
			        <div class="info"> \
			          <h2 class="capitalize name"></h2> \
			          <div> \
			            <span class="rest-type"></span>&nbsp;&nbsp;\
			            <span class="cost">$$</span>\
			          </div>\
			          <div>\
			            <span class="capitalize location"> \
			              <span class="fa fa-location-arrow"></span>\
			            </span>\
			            &nbsp; - &nbsp;\
			            <span class="distance"></span>\
			          </div>\
			          <div class="rating"> \
			          	<span class="stars"></span> \
			          	<span class="num"></span> \
			            ratings\
			          </div>\
			          <span class="fa fa-angle-right"></span>\
			        </div>\
			      </div>\
			      <div class="mid">\
			        <span class="express-love"> \
			          <span class="fa fa-heart"></span>\
			        </span>\
			        <p class="desc"></p>\
			      </div>\
			      <div class="actions text-center">\
			        <span>\
			          <span class="fa fa-times"></span><br>\
			          <span class="action">Dismiss</span>\
			        </span>\
			        <span>\
			          <span class="fa fa-bookmark"></span><br>\
			          <span class="action">Save</span>\
			        </span>\
			        <span>\
			          <span class="fa fa-star"></span><br>\
			          <span class="action">Rate</span>\
			        </span>\
			      </div>\
			    </div>';

	var _getStars = function(stars){

		var stars_html = "";
		for(var i=0;i<Math.floor(stars);i++){
			stars_html += '<span class="fa fa-star"></span>';
		}

		if((stars%1) > 0){ //if decimal
			if((stars%1 > 0.75)){
				stars = Math.ceil(stars); 
				stars_html += '<span class="fa fa-star"></span>';
			}
			else if((stars%1 > 0.25)){
				stars = Math.ceil(stars); 
				stars_html += '<span class="fa fa-star-half-o"></span>';
			}
		}

		for(i=0;i<(5-stars);i++){
			stars_html += '<span class="fa fa-star-o"></span>';
		}

		return stars_html;

	}

	var _setData = function(frag, data){
		
		frag.querySelector('.top .love').appendChild(document.createTextNode(data.love));
		frag.querySelector('.top').style.backgroundImage = "url(" + data.cover + ")";
		frag.querySelector('.name').innerHTML = data.name;
		frag.querySelector('.rest-type').innerHTML = data.restaurant_type;
		frag.querySelector('.cost').innerHTML = data.cost;
		frag.querySelector('.location').appendChild(document.createTextNode(data.city));
		frag.querySelector('.distance').innerHTML = data.distance;
		frag.querySelector('.desc').innerHTML = data.description;
		frag.querySelector('.rating .stars').innerHTML = _getStars(data.ratings.avg_stars);
		frag.querySelector('.rating .num').innerHTML = data.ratings.total_ratings;

		return frag;

	}	    

	return {

		getCardFragment: function(data){
			var frag = document.createDocumentFragment(),
				container = document.createElement('div');

			container.className = "container";
			frag.appendChild(container);
			frag.querySelector('div').innerHTML = card;

			frag = _setData(frag, data);

			return frag.firstChild;

		}

	};

}());

