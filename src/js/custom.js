
//Home single Video
var playButton = document.getElementById("btn-iframe-trigger");
var soundButton = document.getElementById("btn-sound-trigger");
var singleVideo = document.getElementById("single-video");

// Event listener for the play/pause button
playButton.addEventListener("click", function() {
    if (singleVideo.paused == true) {

        singleVideo.play();
        playButton.innerHTML = "<svg class='icon-play-small'><use xlink:href='frontend/images/icons.svg#pause'></use></svg>";

    } else {

        singleVideo.pause();
        playButton.innerHTML = "<svg class='icon-play-small'><use xlink:href='frontend/images/icons.svg#play-small'></use></svg>";

    }
	
});

// Event listener for the mute button
soundButton.addEventListener("click", function() {
    if (singleVideo.muted == false) {  
        soundButton.innerHTML = "<svg class='icon-sound-muted'><use xlink:href='frontend/images/icons.svg#sound-muted'></use></svg>";
        singleVideo.muted = true;

    } else {
        soundButton.innerHTML = "<svg class='icon-sound'><use xlink:href='frontend/images/icons.svg#sound'></use></svg>";
        singleVideo.muted = false;
    
    }
    
});


 