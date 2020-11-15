	hs.graphicsDir = 'highslide/graphics/';
	hs.restoreCursor = null;
	hs.lang.restoreTitle = 'Click for next image';
	hs.allowSimultaneousLoading = true;
	hs.expandDuration = 0;
	hs.captionOverlay.fade = false;

	// Add the slideshow providing the controlbar and the thumbstrip FOR THE IN-PAGE GALLERIES. 
	hs.addSlideshow({
	  slideshowGroup: ['group4', 'group5'],
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

	var inPageOptions4 = {
		slideshowGroup: 'group4',
		outlineType: null,
		allowSizeReduction: true,
		wrapperClassName: 'in-page controls-in-heading',
		useBox: true,
		width: 590,
		height: 400,
		targetX: 'gallery-area-4 10px',
		targetY: 'gallery-area-4 10px',
		captionEval: 'this.thumb.alt',
		numberPosition: 'caption',
		transitions: ['expand', 'crossfade']
	}

	var inPageOptions5 = {
		slideshowGroup: 'group5',
		outlineType: null,
		allowSizeReduction: true,
		wrapperClassName: 'in-page controls-in-heading',
		useBox: true,
		width: 590,
		height: 400,
		targetX: 'gallery-area-5 10px',
		targetY: 'gallery-area-5 10px',
		captionEval: 'this.thumb.alt',
		numberPosition: 'caption',
		transitions: ['expand', 'crossfade']
	}

	// Open the first thumb on page load FOR BOTH IN-PAGE GALLERIES
	hs.addEventListener(window, 'load', function() {
		document.getElementById('thumb4').onclick();
		document.getElementById('thumb5').onclick();
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


	
hs.Expander.prototype.onMouseOver = function () {
   this.focus();
};

// Nesseccary when using the focus mod below
hs.transitionDuration = 0;
