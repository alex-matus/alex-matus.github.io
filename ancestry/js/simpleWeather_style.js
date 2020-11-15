$(function() {			
    $.simpleWeather({
	zipcode: '53715',
	unit: 'f',
	success: function(weather) {
	    $("#weather").append('<table border="0" width="252px"><tr><td style="background-image:'+weather.image+';" width="80px;"><div class="crop"><img style="float:left;padding-top:15px;" src="'+weather.image+'"></div></td><td width="172px" style="padding-top:7px;text-align:left;"><p>'+weather.city+', '+weather.region+'</p><p style="font-size:16px">'+weather.temp+'&deg;'+weather.units.temp+'</p><p>'+weather.currently+'</p></div></td></tr></table>');
	},
	error: function(error) {
	    $("#weather").html('<p>'+error+'</p>');
	}
    });
});