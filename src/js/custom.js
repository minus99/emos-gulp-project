
var playButton = document.getElementById("btn-iframe-trigger");
meta = document.getElementById('meta');
// Event listener for the play/pause button
playButton.addEventListener("click", function() {
  if (video.paused == true) {
    // Play the video
    video.play();

    // Update the button text to 'Pause'
    playButton.innerHTML = "<div class='my-10'>Pause</div>";
  } else {
    // Pause the video
    video.pause();

    // Update the button text to 'Play'
    playButton.innerHTML = "<svg class='icon-play-small'><use xlink:href='frontend/images/icons.svg#play-small'></use></svg>";
  }

  var duration = video.duration;
  meta.innerHTML = duration;
	
});
