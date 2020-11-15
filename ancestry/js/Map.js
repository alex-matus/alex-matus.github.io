//Map.js,v 1.10 2011/07/28 23:59:45 eseiler Exp
//-@@@ SSW, Version SSW_1_14_08
/**
 * 
 *
 */

GIOVANNI.namespace("GIOVANNI.widget.Map");

GIOVANNI.widget.Map=function(containerId,config)
{
	//Get the ID of the container element
	this.container=document.getElementById(containerId);
	if (this.container==null){
		alert("Error: element '"+containerId+"' was not found.");
		return;
	}
	//Store the container's ID
	this.containerId=containerId;	
	//Define an object for holding configuration 
	if (config===undefined){
		config={};
	}
	//Set the default zoom to 1
	if (config.zoom===undefined){
		config.zoom={max:10, min:1, defaultVal:1};
	}
        if (config.maxExtent===undefined){
                config.maxExtent=new OpenLayers.Bounds(-180,-90,180,90);
        }
	//Create a DIV for cursor location
	var cursorDiv=document.createElement('div');
	cursorDiv.setAttribute('id',this.containerId+'Cursor');
	//cursorDiv.setAttribute('class','olControlMousePosition');
	cursorDiv.innerHTML='&nbsp;';
	this.container.appendChild(cursorDiv);
	
	//Create a DIV for Map Controls
	var panZoomDiv=document.createElement('div');
        this.container.appendChild(panZoomDiv);
	var controlDiv=document.createElement('div');
	controlDiv.setAttribute('id',this.containerId+'Control');
	this.container.appendChild(controlDiv);
	
	//Create a DIV for Map itself
	var mapDiv=document.createElement('div');
	mapDiv.setAttribute('id',this.containerId+'Map');
	this.container.appendChild(mapDiv);	
	//By default selection type is bounding box
	this.selectionType="BBOX";	
	//Create the OpenLayers map
	var defaultControls=[new OpenLayers.Control.PanZoom()];


	this.map=new OpenLayers.Map(this.containerId+'Map',{controls:defaultControls});
        this.map.setOptions({restrictedExtent:config.maxExtent,minResolution:"auto",units:'degrees'});
	//Add the blue marble layer
/*
	this.addLayer({name:"Blue Marble", type:"WMS", 
 		url:"http://maps.opengeo.org/geowebcache/service/wms",
		parameters:{layers:"bluemarble"},
		options:{wrapDateLine:false} });

        this.addLayer({name:"Blue Marble", type:"WMS",
                url:"http://disc1.sci.gsfc.nasa.gov/daac-bin/wms_ogc",
                parameters:{layers:"bluemarble",format:"image/png",bgcolor: 'FFFFFF',},
                options:{wrapDateLine:false} });
*/

        this.addLayer({name:"Blue Marble", type:"WMS",
                url:"http://disc1.gsfc.nasa.gov/daac-bin/wms_ogc",
                parameters:{layers:"countries",format:"image/png"},
                options:{wrapDateLine:false,bgcolor: "FFFFFF"} });


        // Add graticule control
        var grat = new OpenLayers.Control.Graticule({
            numPoints: 2,
            labelled: false,
            lineSymbolizer:{strokeColor: "#333", strokeWidth: 1, strokeOpacity: 0.5}
            //labelSymbolizer:{strokeColor: "white", strokeWidth: 1, strokeOpacity: 0.7, labelXOffset: 10, labelYOffset: 10},
        });
        this.map.addControl(grat);


	//Add a vector layer for drawing 
        this.markerLayer=this.addLayer({name:"Marker", type:"Vector", wrapDateLine:false});
	//Formatter for the cursor location (significant digits...) before displaying
	var formatLonLat=function(lonLat){
		var lat=lonLat.lat;
		var lon=lonLat.lon;
		if (Math.abs(lat)<=90 && Math.abs(lon)<=180){
			var ns=OpenLayers.Util.getFormattedLonLat(lat,'lat','dm');
			var ew=OpenLayers.Util.getFormattedLonLat(lon,'lon','dm');
			return ns+', '+ew;
		}
		return '&nbsp;';
	};
	//Enable cursor location display
    this.map.addControl(new OpenLayers.Control.MousePosition({div:cursorDiv,numDigits:1, formatOutput:formatLonLat}));
    
    //var graticuleCtl=new OpenLayers.Control.Graticule({numPoints:2,labelled:true});
    //this.map.addControl(graticuleCtl);
    
    //Create Pan control
    var navControl = new OpenLayers.Control.Navigation({title: 'Click and Drag to pan the map'});
    //Create the bounding box selection control
    var bboxControl=this.getBoundingBoxControl({type:OpenLayers.Control.TYPE_TOOL,
    	title: 'Click and Drag to draw region of interest', 
    	displayClass:'olControlBbox'});
    //Create a control panel with default control as the bounding box selection control
    var controlPanel=new OpenLayers.Control.Panel({defaultControl:bboxControl, div:document.getElementById(this.containerId+'Control')});
    //Add created controls to the control panel
    controlPanel.addControls([bboxControl,navControl]);
    this.navControl=navControl;
    this.bboxControl=bboxControl;
    //Add the control panel
    this.map.addControl(controlPanel);
    //Set the map center to (0,0)
    this.map.setCenter(new OpenLayers.LonLat(0, 0), config.zoom.defaultVal);


    //Create a custom event for completion of selection
    this.onSelectionEvent=new YAHOO.util.CustomEvent("SelectionEvent",this);

this.map.isValidZoomLevel = function(zoomLevel) {
   if (zoomLevel<1){
     this.zoomTo(1);
   }
   return (zoomLevel >=1 ? true : false);
};

};

//Adds a layer
GIOVANNI.widget.Map.prototype.addLayer=function(config)
{
	var layer;
	if (config.type==='WMS'){
		//Adding a WMS layer
		layer=new OpenLayers.Layer.WMS(config.name,config.url,config.parameters,config.options);
		this.map.addLayer(layer);
	}else if (config.type==='Vector'){
		//Adding a vector layer
		layer=new OpenLayers.Layer.Vector(config.name);
		this.map.addLayer(layer);
	}
	//Return the layer
	return layer;
};

GIOVANNI.widget.Map.prototype.drawBoundingBox=function()
{
if (this.nwCorner===undefined || this.seCorner===undefined){
  return;
}
	var markerStyle = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
	markerStyle.fillOpacity = 0.2;
	markerStyle.graphicOpacity = 1;
var tl=this.nwCorner;
var br=this.seCorner;
var pointList=[];
pointList.push(new OpenLayers.Geometry.Point(tl.lon,tl.lat));
pointList.push(new OpenLayers.Geometry.Point(tl.lon,br.lat));
pointList.push(new OpenLayers.Geometry.Point(br.lon,br.lat));
pointList.push(new OpenLayers.Geometry.Point(br.lon,tl.lat));
var linearRing = new OpenLayers.Geometry.LinearRing(pointList);
var region=new OpenLayers.Feature.Vector(
new OpenLayers.Geometry.Polygon([linearRing]),null,markerStyle);
this.markerLayer.addFeatures(region);
};


//Adds an OpenLayers control for selecting bounding boxes
GIOVANNI.widget.Map.prototype.getBoundingBoxControl=function(config)
{
	if (config===undefined){
		config={};
	}
	config.self=this;
	this.bboxControl=new OpenLayers.Control(config);
	this.bboxControl.oldActivate=this.bboxControl.activate;
	this.bboxControl.oldDeActivate=this.bboxControl.deactivate;
	OpenLayers.Util.extend(this.bboxControl,
			{				
				draw: function(){
					this.box=new OpenLayers.Handler.Box(this.self.bboxControl, 
							{"done": this.notice});
					var oldStartBox=this.box.startBox;
					OpenLayers.Util.extend(this.box,{
						startBox: function(xy){
							this.self.markerLayer.destroyFeatures();
							//oldStartBox(xy);
						}
					});
				},
				notice: function(bounds){
					var tl=this.self.map.getLonLatFromPixel(new OpenLayers.Pixel(bounds.left,bounds.top));
					var br=this.self.map.getLonLatFromPixel(new OpenLayers.Pixel(bounds.right,bounds.bottom));
					if (isNaN(tl.lat)||isNaN(tl.lon)||isNaN(br.lat)||isNaN(br.lon)){
						//Don't draw a box
					}else{
						this.self.nwCorner=tl;
						this.self.seCorner=br;
						this.self.markerLayer.destroyFeatures();
                                        	this.self.drawBoundingBox();
						this.self.onSelectionEvent.fire([br.lat,tl.lon,tl.lat,br.lon]);
					}
				},
				toggleActivate: function(){alert('toggle');},
				activate: function(){
					this.box.activate();
					this.self.bboxControl.oldActivate();
				},
				deactivate: function(){
					this.box.deactivate();
					this.self.bboxControl.oldDeActivate();
				},
				redraw: function(){
					alert('redraw');
				},
				trigger: function(){
					alert('trigger');
				},
				click: function(){
					alert('test');
				}
			}
			);
	return this.bboxControl;
};

//Hides a layer given its name
GIOVANNI.widget.Map.prototype.hideLayer=function(name)
{
	//Loop through all layers in the map to look for layer with specified name
	for (var i=0; i<this.map.layers.length; i++){
		if (this.map.layers[i].name===name){
			//Set visibility of the given layer to false
			this.map.layers[i].setVisibility(false);
		}
	}
		
};

//Shows a layer given its name
GIOVANNI.widget.Map.prototype.showLayer=function(name)
{
	//Loop through all layers in the map to look for layer with specified name
	for (var i=0; i<this.map.layers.length; i++){
		if (this.map.layers[i].name===name){
			//Set visibility of the given layer to true
			this.map.layers[i].setVisibility(true);
		}
	}		
};

GIOVANNI.widget.Map.prototype.redraw=function()
{
	alert('test');
  this.showLayer('Marker');
  this.drawBoundingBox();
};

//Sets the value of the Map component
GIOVANNI.widget.Map.prototype.setValue=function(nw,se)
{
this.markerLayer.destroyFeatures();
if (nw!==undefined && se!==undefined){
this.nwCorner=new OpenLayers.LonLat(nw.lon,nw.lat);
this.seCorner=new OpenLayers.LonLat(se.lon,se.lat);
}else{
delete(this.nwCorner);
delete(this.seCorner);
}
this.drawBoundingBox();
this.hideLayer('Marker');
};

GIOVANNI.widget.Map.prototype.show=function()
{
  this.showLayer('Marker');
};

//Hide the map
GIOVANNI.widget.Map.prototype.hide=function()
{
  this.hideLayer('Marker');
};
