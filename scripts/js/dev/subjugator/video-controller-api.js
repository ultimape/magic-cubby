
console.group("Loading Youtube Player"); 
console.log("Loading Youtube Player");
console.time("Loading Youtube Player");
console.time("Loading Youtube Player Iframe");

var theTimeout;

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {

  console.timeEnd("Loading Youtube Player Iframe");

  player = new YT.Player('yt-player', {
    height: '390',
    width: '640',
    videoId: '03IqXP_-VkU',
    playerVars: {
                 'enablejsapi':1,      // 1 = enable api controls
                 'start': 161,         // start video at (seconds)
                 'autoplay': 1,        // 1 = autoplay the video (note: not work on mobile?)
                 'controls': 0,        // 0 = hide player control
                 'disablekb': 0,       // 0 = disable keyboard controls
                 'cc_load_policy' : 1, // 1 = enable cc by default
                 'modestbranding':1,   // 1 = remove most branding
                 'showinfo': 0,        // 0 = hide video details
                 'rel': 0,              // 0 = don't display 'related videos' on pause/stop
                 'iv_load_policy': 3   // 3 = don't display annotations
                },
    events: {
      'onReady': onPlayerReady,
      'onPlaybackQualityChange': onPlayerPlaybackQualityChange,
      'onStateChange': onPlayerStateChange,
      'onError': onPlayerError
    }

  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {

  console.timeEnd("Loading Youtube Player");
  console.log("Youtube Player Ready");
  console.groupEnd("Loading Youtube Player"); 

  
  event.target.setVolume(1);
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
 // console.log(event);
  
  if(event.data == YT.PlayerState.PLAYING){ console.log("PLAYING ["+event.data+"]");}
  else if(event.data == YT.PlayerState.UNSTARTED){ console.log("UNSTARTED ["+event.data+"]");}
  else if(event.data == YT.PlayerState.ENDED){ console.log("ENDED ["+event.data+"]");}
  else if(event.data == YT.PlayerState.PLAYING){ console.log("PLAYING ["+event.data+"]");}
  else if(event.data == YT.PlayerState.PAUSED){ console.log("PAUSED ["+event.data+"]");}
  else if(event.data == YT.PlayerState.BUFFERING){ console.log("BUFFERING ["+event.data+"]");}
  else if(event.data == YT.PlayerState.CUED){ console.log("CUED ["+event.data+"]");}
  else { console.log("(unknow) ["+event.data+"]");}
  
  if (event.data == YT.PlayerState.PLAYING) {
    if(theTimeout !== undefined && theTimeout !== null) {clearTimeout(theTimeout);}
    theTimeout = setTimeout(pauseVideo, 5300);
    
  }
  
  if(event.data == YT.PlayerState.CUED) { 
         
  }
  if(event.data == YT.PlayerState.PAUSED) {
  seekTo();
  playVideo();
  }
  if(event.data == YT.PlayerState.UNSTARTED) {
   
  }
}
function playVideo() {
  console.log("playVideo()");
  player.playVideo();
}
function pauseVideo() {
  console.log("pauseVideo()");
  player.pauseVideo();
}
function stopVideo() {
  console.log("stopVideo()");
  player.stopVideo();
  
}
function seekTo() {
  console.log("seekTo()");
  player.seekTo(168,true);
}

function onPlayerPlaybackQualityChange(event) {
  
}
  
function onPlayerError(event) {

}


