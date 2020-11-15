$(function() {			
    $.simpleWeather({
	zipcode: '53715',
	unit: 'f',
	success: function(weather) {
	    $('head').append('<link rel="icon" href="'+weather.image+'">');
	},
    });
});