/**
 * 
 */
//BoundingBox.js,v 1.10 2015/12/07 22:54:01 aritrivi Exp
//-@@@ SSW, Version SSW_1_14_08
GIOVANNI.namespace("GIOVANNI.widget.BoundingBox");

GIOVANNI.widget.BoundingBox=function(containerId,config)
{
    this.container=document.getElementById(containerId);
    if(this.container==null){
        alert("Error: The element '"+containerId+"' was not found.");
        return;
    }
    // Store the container's ID
    this.containerId=containerId;
    // Default settings
    var defaults={
        id:containerId+"Bbox",
        label:"-82.5, -180, 82.5, 180", 
        hint:"-82.5, -180, 82.5, 180",
        textFieldSize: 30
    };
    // Override default settings via constructor arguments
    if (config===undefined){
        config={};
    }
    // Save configuration
    this.id=(config.id==undefined)?defaults.id:config.id;
    this.label=(config.label===undefined)?defaults.label:config.label;
    this.hint=(config.hint===undefined)?defaults.hint:config.hint;
    this.textFieldSize=(config.textFieldSize===undefined)?defaults.textFieldSize:config.textFieldSize;

    this.convention=['south','west','north','east'];
    // Render the component
    this.render();
    this.dialogStatus='close';
};

GIOVANNI.widget.BoundingBox.prototype.render=function()
{
    if (this.mapDialog){
        this.dialogStatus='open';
        // Added alignment in case page dimensions changed since creation 
        this.mapDialog.align('tl', 'bl');
        this.mapDialog.show();
        this.map.show();
    }else{
        // Create a DIV tag to hold widget contents
        var divTag=document.createElement('div');
        divTag.setAttribute('class','bbox');

        this.inputTextField=document.createElement('input');
        this.inputTextField.setAttribute('type','text');
        this.inputTextField.setAttribute('id',this.id);
        this.inputTextField.setAttribute('value',this.hint);
        this.inputTextField.setAttribute('size',this.textFieldSize);
        this.inputTextField.setAttribute('class','default');
        divTag.appendChild(this.inputTextField);

        var button=document.createElement('a');
        button.setAttribute('id',this.id+'Button');
        button.setAttribute('title','Select using map');
        button.setAttribute('href','#');
        var icon=document.createElement('img');
        icon.setAttribute('id',this.id+'Icon');
        icon.setAttribute('src','globe.png');
        icon.setAttribute('alt','Select using map');
        icon.setAttribute('border',0);
        icon.setAttribute('width',20);
        icon.setAttribute('height',15);
        icon.setAttribute('style','padding-left: 3px; vertical-align: middle');
        button.appendChild(icon);
        divTag.appendChild(button);
        this.container.appendChild(divTag);

        var buttons=[{text:"&nbsp;Close&nbsp;", handler:{fn:this.closeMapDialog, obj:this}, isDefault:true}];

        this.mapDialog=new YAHOO.widget.Dialog("MapDialog", {
            visible:false,
            draggable:false,
            close:false,
            context:[this.id+'Icon','tl','bl'],
            buttons: buttons
        });
        //this.mapDialog.setHeader('Spatial Selection');
        var mapDivHTML='<div id="' + this.id + 'Map"></div>';
        this.mapDialog.setBody(mapDivHTML);
        this.mapDialog.render(document.body); 
        var map=new GIOVANNI.widget.Map(this.id+'Map');
        //Subscribe to selection event on map
        map.onSelectionEvent.subscribe(GIOVANNI.widget.BoundingBox.mapCallBack,this);
        this.map=map;
        YAHOO.util.Event.addListener(button,"click",this.showMapDialog,this);
        YAHOO.util.Event.addListener(this.inputTextField,"change",this.locationFieldEventHandler,this);
        var hideHandler=function(e){map.hide();};
        this.mapDialog.hideEvent.subscribe(hideHandler);
        this.dialogStatus='open';
    }
};

GIOVANNI.widget.BoundingBox.prototype.closeMapDialog=function(e,self)
{
    self.mapDialog.hide();
    self.dialogStatus='close';
};

GIOVANNI.widget.BoundingBox.prototype.showMapDialog=function(e,self)
{
    YAHOO.util.Event.preventDefault(e);
    self.dialogStatus='open';
    // Added alignment in case page dimensions changed since creation 
    self.mapDialog.align('tl', 'bl');
    self.mapDialog.show();
    self.map.show();
};

GIOVANNI.widget.BoundingBox.prototype.locationFieldEventHandler=function(e,self)
{
    //Split in to four (south,west,north,east)
    var str=self.inputTextField.value;
    str=str.replace(/^\s+|\s+$/g,'');
    var fieldTest=/\S+/;
    //Check whether the value has any non-white space character
    var validFlag=true;
    if (fieldTest.test(str)){
        var list=str.split(',');
        if (list.length===4){
            //Remove leading and trailing white space
            for (var i=0; i<list.length && validFlag; i++){
                list[i]=list[i].replace(/^\s+|\s+$/g,'');
                var num=parseFloat(list[i]);
                //Check whether the input is a valid number
                if (isNaN(num)){
                    alert(list[i]+' is not a number.');
                    validFlag=false;
                }else{
                    if (self.convention[i]==='north' || self.convention[i]==='south'){
                        if (num<-90 || num>90){
                            validFlag=false;
                            alert(self.convention[i].substr(0,1).toUpperCase()+self.convention[i].substr(1)+' must be in the range [-90,90]');
                        }
                    }else{
                        if (num<-180 || num>180){
                            validFlag=false;
                            alert(self.convention[i].substr(0,1).toUpperCase()+self.convention[i].substr(1)+' must be in the range [-180,180]');
                        }
                    }
                    if (validFlag){
                        self[self.convention[i]]=num;
                    }
                }
            }
        }else{
            alert('Please specify South,West,North,East coordinates.');
            validFlag=false;
        }

        //If not a valid set of coordinates, set the focus to the location text box
        if (!validFlag){
            setTimeout(function(){self.inputTextField.focus();self.inputTextField.select();},1);
        }
    }else{
        validFlag=false;
    }

    //Reset coordinates if non-valid coordinates are found
    if (!validFlag){
        for (var i=0; i<self.convention.length; i++){
            delete(self[self.convention[i]]);
        }
        self.map.setValue();
    }else{
        self.map.setValue({lon:self.west,lat:self.north}, {lon:self.east,lat:self.south});
    }
    if (self.dialogStatus==='open'){
        self.map.show();
    }
};


GIOVANNI.widget.BoundingBox.mapCallBack=function(type,args,self)
{
    for (var i=0; i<self.convention.length; i++){
        var num=args[0][i].toFixed(2);
        self[self.convention[i]]=num;
    }
    var bbox=self.getValue(); 
    self.inputTextField.value=bbox.join(', ');
};

GIOVANNI.widget.BoundingBox.prototype.getValue=function()
{
    if (this.south!==undefined && this.north!==undefined && this.east!==undefined && this.west!==undefined){
        return [this.south,this.west,this.north,this.east];
    }else{
        return [-82.5, -180, 82.5, 180];
    }
};

GIOVANNI.widget.BoundingBox.prototype.hide=function()
{
    this.mapDialog.hide();
};
