function ScanView(){
	var self = Ti.UI.createView();
	
	// load the Scandit SDK module
	var scanditsdk = require("com.mirasense.scanditsdk");
	var picker = scanditsdk.createView({
        width:"100%",
        height:"100%"
    });
    // Initialize the barcode picker, remember to paste your own app key here.
    picker.init("Z0MclHuyEeOGso/brTymXL4RoEYH9/pO9qApuuIsmA4");
    picker.showSearchBar(true);
    // add a tool bar at the bottom of the scan view with a cancel button (iphone/ipad only)
    picker.showToolBar(true);
    // Set callback functions for when scanning succeedes and for when the 
    // scanning is canceled.
    picker.setSuccessCallback(function(e) {
        alert("success (" + e.symbology + "): " + e.barcode);
    });
    picker.setCancelCallback(function(e) {
        closeScanner();
    });
    self.add(picker);
    // window.addEventListener('open', function(e) {
        // // Adjust to the current orientation.
        // // since window.orientation returns 'undefined' on ios devices 
        // // we are using Ti.UI.orientation (which is deprecated and no longer 
        // // working on Android devices.)
        // if(Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad'){
            // picker.setOrientation(Ti.UI.orientation);
        // }   
        // else {
            // picker.setOrientation(window.orientation);
        // }
//         
        // picker.setSize(Ti.Platform.displayCaps.platformWidth, 
                       // Ti.Platform.displayCaps.platformHeight);
        // picker.startScanning();     // startScanning() has to be called after the window is opened. 
    // });
    // Stops the scanner, removes it from the window and closes the latter.
	function closeScanner() {
	    if (picker != null) {
	        picker.stopScanning();
	        window.remove(picker);
	    }
	    self.fireEvent("shouldCloseView");
	}
	// Changes the picker dimensions and the video feed orientation when the
	// orientation of the device changes.
	Ti.Gesture.addEventListener('orientationchange', function(e) {
	    window.orientationModes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, 
	                   Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];
	    if (picker != null) {
	        picker.setOrientation(e.orientation);
	        picker.setSize(Ti.Platform.displayCaps.platformWidth, 
	                Ti.Platform.displayCaps.platformHeight);
	        // You can also adjust the interface here if landscape should look
	        // different than portrait.
	    }
	});
    
	return self;
};

module.exports = ScanView;







