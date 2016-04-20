/*
	Cards scroll animation functionality
*/
var Animate = (function(){
	
	'use strict';

	var element = null,
		avg_container_width = null,
		max_display_percent = null,
		orig_display_percent = null,
		data_length = null,
		window_resized = false;

	var _scrollHandler = function(e){
	
		_scrollAnimate();
		
	}

	var _scrollAnimate = function(){

		var scroll = element.scrollLeft,
			scroll_frac = scroll/avg_container_width;

		var cur_card = Math.round(scroll_frac);
		
		element.getElementsByClassName('container')[cur_card].style.width = max_display_percent + "%"; //expand current card being viewed

		//shrink cards to original size when not in focus
		if((scroll_frac%1) > 0.75){
			element.getElementsByClassName('container')[cur_card - 1].style.width = orig_display_percent + "%";
		}
		else if((scroll_frac%1) <= 0.5){
			element.getElementsByClassName('container')[cur_card + 1].style.width = orig_display_percent + "%";	
		}

	}

	var _resizeCards = function(){
		
		for(var i=0;i<data_length;i++){
			element.getElementsByClassName('container')[i].style.width = "";
		}

	}

	return{
		scrollCards: function(elem, data_len){

			if(window_resized){
				_resizeCards();
				window_resized = false;
			}

			var container_width = elem.querySelector('.container').offsetWidth,
				section_width = elem.offsetWidth;

			element = elem;
			orig_display_percent = Math.round(elem.getElementsByClassName('container')[1].offsetWidth*100/section_width);
			max_display_percent = Math.round(container_width*100/section_width);
			data_length = data_len;
			avg_container_width = (((data_length-1)*(orig_display_percent*container_width/max_display_percent)) + container_width) / data_length;

			element.addEventListener('scroll', _scrollHandler, false);
		},

		removeScrollAnimation: function(){
			element.removeEventListener('scroll', _scrollHandler, false);
			window_resized = true;
			element.scrollLeft = 0;
		}
	};

}());