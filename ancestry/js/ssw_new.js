
var bbox

function Hello()
{
    
//    var l = Ladda.create(document.querySelector('.ladda-button'));
//    l.start();
//    l.isLoading();
//    l.setProgress( 0.1 );

    var dset = document.getElementById('dataset').value;
    var date = document.getElementById('t2').value;
    var bbox = bboxWidget.getValue();

    document.getElementById("demo1").innerHTML = dset;
    document.getElementById("demo2").innerHTML = date;
    document.getElementById("demo3").innerHTML = bbox;

    //$("#divId").load("http://sun.aos.wisc.edu/cgi-bin/test.py?dataset=" + dset+"&date="+date+"&loc="+bbox); 

    //document.getElementById("myimage").src = "http://sun.aos.wisc.edu/cgi-bin/test.py?dataset=" + dset+"&date="+date+"&loc="+bbox;

    $("#myimage").attr("src", "http://sun.aos.wisc.edu/cgi-bin/test.py?dataset=" + dset+"&date="+date+"&loc="+bbox);


    




//    $.ajax({
//	url: "http://sun.aos.wisc.edu/cgi-bin/test.py?dataset=" + dset+"&date="+date+"&loc="+bbox,
//	success: function(response){
//	    x=document.getElementById("map_img")
//	    x.style.visibility="visible";
//	    //here you do whatever you want with the response variable
//	}
//    });

    //var site = "http://sun.aos.wisc.edu/cgi-bin/test.py?dataset=" + dset+"&date="+date+"&loc="+bbox;
    //document.getElementById('iframe2').src = site;


 


}

