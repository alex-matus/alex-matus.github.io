<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta name="Keywords" content="alex matus, alexander matus, matus, graduate student, grad student, Wisconsin, Madison, University of Wisconsin, atmsopheric sciences, meteorology, weather, aerosol, radiation, chemistry, clouds, air quality, atmospheric and oceanic sciences, phd, ph.d., satellite, satellite remote sensing, climatemaps, climate, penn state, nasa, linkedin">
<meta name="Description" content="Alex Matus is a graduate student at
the University of Wisconsin in the field of satellite remote sensing.">
<meta http-equiv="content-type" content="text/html; charset=utf-8" />

<?php echo "<title>".(isset($title)?$title:"Default title")."</title>\n"; ?>

<!--ICON-->
<!--simpleWeather_icon.js-->

<!--FONTS-->
<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Open+Sans">
<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Rock+Salt">

<!--CSS-->
<link rel="stylesheet" type="text/css" href="http://sun.aos.wisc.edu/css/highslide.css" />
<!--[if lt IE 7]>
<link rel="stylesheet" type="text/css" href="http://sun.aos.wisc.edu/css/highslide-ie6.css" />
<![endif]-->
<link href="http://sun.aos.wisc.edu/css/style.css" rel="stylesheet" type="text/css" media="screen"/>

<!--JS-->
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="http://sun.aos.wisc.edu/js/jquery.simpleWeather-2.0.1.min.js" charset="utf-8"></script>
<script type="text/javascript" src="http://sun.aos.wisc.edu/js/highslide-full.js"></script>
<script type="text/javascript" src="http://sun.aos.wisc.edu/js/hsresearch_style.js"></script>
<script type="text/javascript" src="http://sun.aos.wisc.edu/js/hsprojects_style.js"></script>
<script type="text/javascript" src="http://sun.aos.wisc.edu/js/simpleWeather_style.js"></script>
<script type="text/javascript" src="http://sun.aos.wisc.edu/js/simpleWeather_icon.js"></script>

<!-- Fix Chrome v33 Fonts issue --> 
<script type="text/javascript" charset="utf-8">
$( document ).ready(function() {
	jQuery('body')
	  .delay(10)
	  .queue( 
	  	function(next){ 
	    	jQuery(this).css('padding-right', '0px'); 
	  	}
	  );
});
</script>

</head>
<body>
<div id="wrapper"><!-- begin #wrapper -->
<div id="header-wrapper"><!-- begin #header-wrapper -->
<div id="header">
<div id="logo">
  
<div id="loleft">
  <h1><a href="http://sun.aos.wisc.edu/">Alex Matus</a></h1>
  <p>Atmospheric Scientist</p>
</div>

<div id="loright">
<div id="weather"></div>
</div>

</div>			
</div>
</div><!-- end #header-wrapper -->

<div id="menu-wrapper"><!-- begin #menu-wrapper -->
<div id="nav">
  <ul>
    <li <?php if (strpos($_SERVER['PHP_SELF'], 'index.php')) echo 'class="current_page_item"';?>><a href="http://sun.aos.wisc.edu">Home</a></li>
    <li <?php if (strpos($_SERVER['PHP_SELF'], 'bio.php')) echo 'class="current_page_item"';?>><a href="http://sun.aos.wisc.edu/bio">Bio</a></li>
    <li <?php if (strpos($_SERVER['PHP_SELF'], 'research.php')) echo 'class="current_page_item"';?>><a href="http://sun.aos.wisc.edu/research">Research</a></li>		
    <li <?php if (strpos($_SERVER['PHP_SELF'], 'coursework.php')) echo 'class="current_page_item"';?>><a href="http://sun.aos.wisc.edu/coursework">Coursework</a>

        <ul>
            <li><a href="http://sun.aos.wisc.edu/cw/dynamics">Dynamics</a></li>
            <li><a href="http://sun.aos.wisc.edu/cw/radiation">Radiation</a></li>
            <li><a href="http://sun.aos.wisc.edu/cw/chemistry">Chemistry</a></li>
            <li><a href="http://sun.aos.wisc.edu/cw/physics">Physics</a></li>
            <li><a href="http://sun.aos.wisc.edu/cw/oceanography">Oceanography</a></li>	  
        </ul>

    </li>
    <li <?php if (strpos($_SERVER['PHP_SELF'], 'cv.php')) echo 'class="current_page_item"';?>><a href="http://sun.aos.wisc.edu/cv">CV</a></li>
    <li <?php if (strpos($_SERVER['PHP_SELF'], 'projects.php')) echo 'class="current_page_item"';?>><a href="http://sun.aos.wisc.edu/projects">Projects</a></li>
    <li <?php if (strpos($_SERVER['PHP_SELF'], 'contact.php')) echo 'class="current_page_item"';?>><a href="http://sun.aos.wisc.edu/contact">Contact</a></li>
  </ul>
</div>
</div><!-- end #menu-wrapper -->

<div id="page"><!-- begin #page -->
<div id="page-bgtop">
<div id="page-bgbtm">
<div id="page-content">