//Calendar.js,v 1.6 2011/10/27 13:13:19 rstrub Exp
//-@@@ SSW, Version SSW_1_14_08
/**
 * Create Calendar for date or date-time selection
 */
GIOVANNI.namespace("GIOVANNI.widget.Calendar");

/**
 * Creates the Giovanni.widget.Calendar object.
 * 
 * @this {Giovanni.widget.Calendar}
 * @param {String, Configuration}
 * @returns {Giovanni.widget.Calendar} 
 * @author M. Hegde 
 */
GIOVANNI.widget.Calendar=function(containerId,config)
{
	//Enable inheritance
        if ( !containerId )  return;
	//Get the ID of the container element
	this.container=document.getElementById(containerId);
	if (this.container==null){
                this.container=document.createElement('div');
                this.container.setAttribute('id',containerId);
		document.body.appendChild(this.container);
	}
	//Store the container's ID
	this.containerId=containerId;
	//Default configuration settings
	var defaults={
		//Set today's date-time as the default	
		dateTime:new Date(),
		//Set the default selection mode as "datetime"
		type:"DateTime",
		//Set the default title to "Pick a date-time"
		title:"Pick a date-time",
		callback:undefined
			
	};
	if (config===undefined){
		config={};
	}
	defaults.title=(config.type==="Date")?"Pick a date":defaults.title;
	this.origDateTime=(config.dateTime===undefined?defaults.dateTime:config.dateTime);
	this.type=(config.type===undefined?defaults.type:config.type);
	this.title=(config.title===undefined?defaults.title:config.title);
	this.callback=(config.callback===undefined?defaults.callback:config.callback);
};

GIOVANNI.widget.Calendar.prototype.getValue=function()
{
	return this.dateTime.toISO8601DateString();
};

GIOVANNI.widget.Calendar.prototype.setValue=function(dateTimeStr)
{
	var status=false;
	//Parse the input date time string
	var t=new Date();
	if (t.parse(dateTimeStr)){
		//If successful, set the dateTime 
		this.dateTime=t;
		status=true;
	}
	return status;
};

GIOVANNI.widget.Calendar.prototype.render=function()
{	
	//Show the dialog and return if the dialog exists.	
	if (this.dialog!==undefined){
    		if (this.dateTime!==undefined){
			// Can't use dateTime because it returns local time
//			this.calendar.select(this.dateTime);
			this.calendar.select(this.dateTime.toMMDDYYYYDateString());
			this.calendar.setMonth(this.dateTime.getUTCMonth());
			this.calendar.setYear(this.dateTime.getUTCFullYear());
			this.calendar.render();
    		}
		this.dialog.show();
		return;
	}
	//Buttons for the dialog
	var buttons;	
	//If the dialog doesn't exist, create a new one
	if (this.type==="DateTime"){
		buttons=[ {text:"&nbsp;Save&nbsp;", handler:{fn:this.saveCalendar, obj:this}, isDefault:false},
		          {text:"&nbsp;Cancel&nbsp;", handler:{fn:this.closeCalendar, obj:this}, isDefault:true}];
	}else{
		buttons=[  
		          {text:"&nbsp;Cancel&nbsp;", handler:{fn:this.closeCalendar, obj:this}, isDefault:true}];
	}
	//Create a dialog to hold the calendar
    var dialog = new YAHOO.widget.Dialog(this.containerId+"CalendarDialog", {
        visible:false,
        context:[this.containerId+"CalendarButton", "tl", "bl"],
        buttons:buttons,
        draggable:true,
        close:true
    });
    YAHOO.util.Dom.addClass(this.containerId+"CalendarDialog",'yui-skin-sam');
    //Set the title of the dialog
    dialog.setHeader(this.title);
    dialog.showEvent.subscribe(function() {
    	dialog.fireEvent("changeContent");
    });
    //Create a place holder for the calendar. The ID is derived based
    //on the ID of the container.
    var calId=this.containerId+"Calendar";
    var dialogBodyHTML='<div id="'+calId+'"></div>';
    dialog.setBody(dialogBodyHTML);
    //Render the dialog; has to happen before adding calendar.
    dialog.render(this.container);
    //Create the calendar
    var calendar = new YAHOO.widget.Calendar(calId, {navigator:false});
    //Set the selected date if one exists already
    if (this.dateTime!==undefined){
      // Can't use dateTime because it returns a local time
//      calendar.select(this.dateTime);
      calendar.select(this.dateTime.toMMDDYYYYDateString());
      calendar.setMonth(this.dateTime.getUTCMonth());
      calendar.setYear(this.dateTime.getUTCFullYear());
    }
    if (this.type==="Date"){
    	calendar.selectEvent.subscribe(this.selectDateHandler,this);
    }
    YAHOO.util.Dom.addClass(calId,'yui-skin-sam');
    
    //Render the calendar
    calendar.render();
    //On rendering the calendar, fire a dialog event to convey
    //change in content
    calendar.renderEvent.subscribe(function(){
    	dialog.fireEvent("changeContent");
    });
    this.calendar=calendar;

    dialog.show();
    this.dialog=dialog;
};

/**
 * Sets the date for the Giovanni.widget.Calendar
 * @this {Giovanni.widget.Calendar}
 * @param {Event,Object}
 * @author M. Hegde 
 */
GIOVANNI.widget.Calendar.prototype.selectDateHandler=function(type,args,self)
{
    self.dateTime=self.calendar.toDate(args[0][0]);
	self.dialog.hide();
    if (self.callback!==undefined){
    	self.callback(self);
    }
};

/**
 * Saves the date for the Giovanni.widget.Calendar
 * @this {Giovanni.widget.Calendar}
 * @param {Event,Object}
 * @author M. Hegde 
 */
GIOVANNI.widget.Calendar.prototype.saveCalendar=function(e,self)
{
	var dates=self.calendar.getSelectedDates();
	if (dates.length===1){
		self.dateTime=dates[0];
		//Hide the dialog
	    self.dialog.hide();
	    if (self.callback!==undefined){
	    	self.callback(self);
	    }	    
	}else{
		alert("Please select a date.");
	}
};

/**
 * Closes Giovanni.widget.Calendar instance
 * @this {Giovanni.widget.Calendar}
 * @author M. Hegde 
 */
GIOVANNI.widget.Calendar.prototype.closeCalendar=function(e,self)
{
	//Hide the dialog
	self.dialog.hide();
};

/**
 * Sets the date for the Giovanni.widget.DatePicker
 * @this {YAHOO.widget.Calendar}
 * @param {Event,Object}
 * @author M. Hegde 
 */
YAHOO.widget.Calendar.prototype.buildMonthLabel=function()
{
	var shownDate=this.cfg.getProperty("pagedate");
	var monthList=this.cfg.getProperty("MONTHS_SHORT");
	var monthLabel=monthList[shownDate.getMonth()];
	var year=shownDate.getFullYear();

	//Create a selection list of months; come up with a unque id for attaching an event handler
	var monthId='monthCalendar_'+uid();
	var monthStr='<select id="' + monthId + '">';
	var curMonth=shownDate.getMonth();
	for (i=0;i<12;i++){
		if(i==curMonth){
			monthStr+='<option selected="true">'+monthList[i]+'</option>';
		}else{
			monthStr+='<option>'+monthList[i]+'</option>';
		}
	}
	monthStr+='</select>';
        var monthSelectionHandler=function(e,obj){
		var deltaMonth=this.selectedIndex-obj.currentMonth;
                if (deltaMonth!==0){
			obj.calendar.addMonths(deltaMonth);
		}
        };
        YAHOO.util.Event.addListener(monthId,"change", monthSelectionHandler,{calendar:this,currentMonth:curMonth});
	return year+'   '+monthStr;
};

/**
 * Overrides the next month navigation for Giovanni.widget.DatePicker.
 * Instead of jumping to next month, it jumps to next year.
 * @this {YAHOO.widget.Calendar}
 * @param {Event,Object}
 * @author M. Hegde 
 */
YAHOO.widget.Calendar.prototype.doNextMonthNav=function(e,cal)
{
	YAHOO.util.Event.preventDefault(e);
	cal.nextYear();
};

/**
 * Overrides the previous month navigation for the 
 * Giovanni.widget.DatePicker. Instead of jumping to previous month,
 * it jumps to the previous year instead.
 * @this {YAHOO.widget.Calendar}
 * @param {Event,Object}
 * @author M. Hegde 
 */
YAHOO.widget.Calendar.prototype.doPreviousMonthNav=function(e,cal)
{
	YAHOO.util.Event.preventDefault(e);
	cal.previousYear();
};
