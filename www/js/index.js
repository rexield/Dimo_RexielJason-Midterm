let app= {
    init:function(){
        document.getElementById("battery").addEventListener("click", app.batteryStatus);
        document.getElementById("location").addEventListener("click", app.getCurrentLocation);
        document.getElementById("vibrate").addEventListener("click", app.vibrate);
        document.getElementById("btn").addEventListener("click", app.takephoto); 
    },

    batteryStatus: function(){
      window.addEventListener("batterystatus", app.onBatteryStatus, false);
    },

    onBatteryStatus : function(info){
         alert("Battery Status: Level: " + info.level + " \nisPlugged: " + info.isPlugged);
    },

	getCurrentLocation: function(){
		var options = { enableHighAccuracy: true };
		navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError, options);
	},
	
	onSuccess: function(position){
	
		var longitude = position.coords.longitude;
		var latitude = position.coords.latitude;
		var timestamp = new Date(position.timestamp);
		
		alert("Getting your current location \n" + 
			" \nLongitude: " + longitude +
			" \nLatitude: " + latitude +
			" \nTimestamp: " + timestamp);         
	},
	
	onError: function(error){
		alert("Error: " + error.code +
				" message:" + error.message);
	},
			
       vibrate: function(){
           navigator.vibrate([3000]);
           alert("Vibrate in 3 seconds");
    },
        
    takephoto: function(){
    let opts={
        quality: 80,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        mediaType: Camera.MediaType.PICTURE,
        encodingType: Camera.EncodingType.JPEG,
        cameraDirection: Camera.Direction.BACK,
        targetWidth: 300,
        targetHeight: 400
        };
        
        navigator.camera.getPicture(app.success, app.failure, opts);
    },

    success: function(imgURI){
        document.getElementById('msg').textContent = imgURI;
        document.getElementById('photo').src = imgURI;
    },

    failure: function(msg){
        document.getElementById('msg').textContent = msg;
    }
};
document.addEventListener('deviceready', app.init);