hs.graphicsDir = 'highslide/graphics/';
hs.restoreCursor = null;
hs.lang.restoreTitle = 'Click for next image';
hs.allowSimultaneousLoading = true;
hs.expandDuration = 0;
hs.captionOverlay.fade = false;

// Add the slideshow providing the controlbar and the thumbstrip FOR THE IN-PAGE GALLERIES. 
hs.addSlideshow({
    slideshowGroup: ['group1', 'group2', 'group3'],
    interval: 3000,
    repeat: true,
    useControls: true,
    overlayOptions: {
	position: 'bottom right',
	offsetY: 50,
    },
    thumbstrip: {
	position: 'above',
	mode: 'horizontal',
	relativeTo: 'expander'
    }
});

// Options for the FIRST in-page items
var inPageOptions1 = {
    slideshowGroup: 'group1',
    outlineType: null,
    allowSizeReduction: true,
    wrapperClassName: 'in-page controls-in-heading',
    useBox: true,
    width: 690,
    height: 380,
    targetX: 'gallery-area-1 10px',
    targetY: 'gallery-area-1 10px',
    captionEval: 'this.thumb.alt',
    numberPosition: 'caption',
    transitions: ['expand', 'crossfade']
}

// Options for the SECOND in-page items
var inPageOptions2 = {
    slideshowGroup: 'group2',
    outlineType: null,
    allowSizeReduction: true,
    wrapperClassName: 'in-page controls-in-heading',
    useBox: true,
    width: 690,
    height: 420,
    targetX: 'gallery-area-2 10px',
    targetY: 'gallery-area-2 10px',
    captionEval: 'this.thumb.alt',
    numberPosition: 'caption',
    transitions: ['expand', 'crossfade']
}

// Options for the THIRD in-page items
var inPageOptions3 = {
    slideshowGroup: 'group3',
    outlineType: null,
    allowSizeReduction: true,
    wrapperClassName: 'in-page controls-in-heading',
    useBox: true,
    width: 690,
    height: 380,
    targetX: 'gallery-area-3 10px',
    targetY: 'gallery-area-3 10px',
    captionEval: 'this.thumb.alt',
    numberPosition: 'caption',
    transitions: ['expand', 'crossfade']
}

// Open the first thumb on page load FOR BOTH IN-PAGE GALLERIES
hs.addEventListener(window, 'load', function() {
    document.getElementById('thumb1').onclick();
    document.getElementById('thumb2').onclick();
    document.getElementById('thumb3').onclick();
});

// Cancel the default action for image click and do next instead
hs.Expander.prototype.onImageClick = function() {
    if (/in-page/.test(this.wrapper.className))	return hs.next();
}

// Under no circumstances should the static popup be closed
hs.Expander.prototype.onBeforeClose = function() {
    if (/in-page/.test(this.wrapper.className))	return false;
}
// ... nor dragged
hs.Expander.prototype.onDrag = function() {
    if (/in-page/.test(this.wrapper.className))	return false;
}

// Keep the position after window resize
hs.addEventListener(window, 'resize', function() {
    var i, exp;
    hs.getPageSize();
    
    for (i = 0; i < hs.expanders.length; i++) {
	exp = hs.expanders[i];
	if (exp) {
	    var x = exp.x,
	    y = exp.y;
	    
	    // get new thumb positions
	    exp.tpos = hs.getPosition(exp.el);
	    x.calcThumb();
	    y.calcThumb();
	    
	    // calculate new popup position
	    x.pos = x.tpos - x.cb + x.tb;
	    x.scroll = hs.page.scrollLeft;
	    x.clientSize = hs.page.width;
	    y.pos = y.tpos - y.cb + y.tb;
	    y.scroll = hs.page.scrollTop;
	    y.clientSize = hs.page.height;
	    exp.justify(x, true);
	    exp.justify(y, true);
	    
	    // set new left and top to wrapper and outline
	    exp.moveTo(x.pos, y.pos);
	}
    }
});

hs.Expander.prototype.onMouseOver = function () {
    this.focus();
};

// Nesseccary when using the focus mod below
hs.transitionDuration = 0;
