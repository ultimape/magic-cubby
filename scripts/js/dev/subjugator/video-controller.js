//<![CDATA[

/*
  This code generates the video player
  and the associated managment functions and player logic to be called by the UI.

*/

"use strict";

console.time("Loading Youtube Player");
console.group("Loading Youtube Player");

var thePlayer = null;
var playerParams = { allowScriptAccess: "always" };
var playerAttributes = { id: "myytplayer",  wmode:"transparent"  };


var video_number= 0;
var youtube_embed_url_options = "?enablejsapi=1&playerapiid=ytplayer&version=3"
var chromeless = true;

var youtube_embed_url = "//www.youtube.com/v/"+video_id[video_number]+youtube_embed_url_options;

if(chromeless) {
  console.log("Set as chromeless mode");
  youtube_embed_url = "//www.youtube.com/apiplayer?enablejsapi=1&version=3"; // chromeless
}
var divToReplace = "ytplayer";
var width = "1024";
var height = "576";
var minSwfVersion = "8";

var quality = "medium";

var allAvailablePlaybackRates;


var currentPlayerState;
var lastPlayerState;
var currentPlayerTime;
var currentVideoDuration;
var lastPlayerTime;
var timeDifference
var isVideoCued;
var allowSeekAhead;


var timecodeArea = document.getElementById('timecode');
var videonumberArea = document.getElementById('videonumber');
var continuousPlayCheckbox = document.getElementById('continuous_play');
var videoTitle = document.getElementById('video_title');


//todo, change to html5 video
console.time("embedding SWF object");
swfobject.embedSWF(
youtube_embed_url,
divToReplace, 
width, 
height, 
minSwfVersion, 
null, 
null, 
playerParams, 
playerAttributes
);
console.timeEnd("embedding SWF object");
console.time("Activating Youtube");

function onYouTubePlayerReady(playerId) {
  console.timeEnd("Activating Youtube");
  console.log("Youtube Player Ready");
  console.timeEnd("Loading Youtube Player");
  console.groupEnd();
  window.requestAnimationFrame(updateTimestamp);




  thePlayer = document.getElementById("myytplayer");

  thePlayer.addEventListener("onStateChange", "onytplayerStateChange");
  thePlayer.addEventListener("onPlaybackQualityChange", "onytplayerQualityChange");
  thePlayer.addEventListener("onPlaybackRateChange","onytplayerPlaybackRateChange");
  thePlayer.addEventListener("onError","onytplayerError");
  thePlayer.addEventListener("onApiChange","onytplayerApiChange");

  thePlayer.setPlaybackQuality(quality);

  allAvailablePlaybackRates = thePlayer.getAvailablePlaybackRates();
  console.log("[%s]	rates: "+ allAvailablePlaybackRates, new Date().toISOString());
  console.log("[%s]	current rate: "+ thePlayer.getPlaybackRate(), new Date().toISOString());

  window.requestAnimationFrame(updateTimestamp);

}

function updateTimestamp(time) {
  currentPlayerTime = thePlayer.getCurrentTime();

  timecodeArea.innerHTML 
  = codefiySeconds(currentPlayerTime) + " / " + codefiySeconds(currentVideoDuration);

  videonumberArea.innerHTML
  = video_number+1;

  window.requestAnimationFrame(updateTimestamp);

}

function codefiySeconds(time) {
  var days = parseInt( time / 3600 );
  var hours = parseInt( time / 3600 ) % 24; 
  var minutes = parseInt( time / 60 ) % 60;
  var seconds = time % 60;;

  var textDays = days < 10 ? "0"+days : days;
  var textHours = hours < 10 ? "0"+hours : hours;
  var textMinutes = minutes < 10 ? "0"+minutes : minutes;
  var textSeconds = seconds < 10 ? "0"+seconds.toFixed(3) : seconds.toFixed(3) ;

  return ""+ (days > 0 ? "P"+textDays+"DT":"")+(hours > 0 ? textHours+":" :"")+textMinutes+":"+textSeconds+"";
}


function onytplayerStateChange(newState) {

  var stateName = "";
  currentPlayerState = newState;

  currentPlayerTime = thePlayer.getCurrentTime();


  switch (currentPlayerState) {
    case -1:
    if(chromeless && !isVideoCued ) {
      loadVideo(video_id[video_number]);
      isVideoCued = false;
    }


    stateName = "UNSTARTED";
    lastPlayerTime = thePlayer.getCurrentTime();
    break;

    case 0: 
    stateName = "ENDED";
    lastPlayerTime = thePlayer.getCurrentTime();

    if(continuousPlayCheckbox.checked) {


      isVideoCued = true;
      nextVideo();


    }


    break;

    case 1: 
    stateName = "PLAYING";
    currentVideoDuration = thePlayer.getDuration();
    currentPlayerTime = thePlayer.getCurrentTime();
    break;

    case 2: 
    stateName = "PAUSED";
    timeDifference = currentPlayerTime-lastPlayerTime;

    if (lastPlayerState == 1) {
      console.log("[%s]	Watched "+timeDifference+ " of Video", new Date().toISOString());
      } else if (lastPlayerState == 2 || lastPlayerState==-1 || lastPlayerState == 0) {
      console.log("[%s]	Skipped "+timeDifference+ "of Video", new Date().toISOString());
      } else {
      console.log("[%s]	unknown operation "+timeDifference+" of Video", new Date().toISOString());
    }

    lastPlayerTime = thePlayer.getCurrentTime();

    if(continuousPlayCheckbox.checked && (currentVideoDuration - currentPlayerTime  <= 0.001) ) {
      isVideoCued = true;
      nextVideo();
    }



    break;

    case 3: 
    stateName = "BUFFERING";
    break;

    case 5: 
    stateName = "CUED";
    if(isVideoCued || lastPlayerState == 3 ) {

      isVideoCued=false; 
      play();
      currentVideoDuration = thePlayer.getDuration();
    }


    break;

    default:
    stateName = "UNKNOWN";
    break;
  }
  console.log("[%s]	State: \""+newState+"\"\tIdentified as \""+stateName+"\"  Video time: "+currentPlayerTime, new Date().toISOString());
  lastPlayerTime = currentPlayerTime;
  lastPlayerState = currentPlayerState;



}

function onytplayerQualityChange(newQuality)  {
  console.log("[%s]	Quality Changed: \""+newQuality+"\"", new Date().toISOString());

}

function onytplayerPlaybackRateChange(newPlaybackRate) {
  console.log("[%s]	Playback Rate Changed: \""+newPlaybackRate+"\"", new Date().toISOString());

}

function onytplayerError(errorCode) {
  var errorCodeName = "";
  var errorCodeDescription = "";
  switch (errorCode) {
    case 2:
    errorCodeName = "INVALID_REQUEST";
    errorCodeDescription="The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.";
    break;

    case 100:
    errorCodeName = "VIDEO_NOT_FOUND";
    errorCodeDescription="The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.";
    break;

    case 101:
    errorCodeName = "EMBED_NOT_ALLOWED";
    errorCodeDescription="The owner of the requested video does not allow it to be played in embedded players.";
    break;

    case 150:
    errorCodeName = "EMBED_NOT_ALLOWED_2";
    errorCodeDescription="The owner of the requested video does not allow it to be played in embedded players";
    break;

    default:
    errorCodeName = "UNKNOWN";
    errorCodeDescription="An unknown error was encountered.";
    break;
  }
  console.log("[%s]	Error Encountered: \""+errorCodeName+"["+errorCode+"]\"\r\n\tError Description: \""+errorCodeDescription+"\"", new Date().toISOString());

}

function onytplayerApiChange() {

  var moduleOptions = thePlayer.getOptions();

  console.log("[%s]	API changed, modules loaded: \""+moduleOptions.length+"\"", new Date().toISOString());

  moduleOptions.forEach( function(module) {
    var options = thePlayer.getOptions(module);
    console.log("[%s]	tModule:"+module+", options loaded: \""+options.length+"\"", new Date().toISOString());
    options.forEach( function(opt) {
      optValue = thePlayer.getOption(module,opt);
      console.log("[%s]	t\tOption: "+opt+"\r\n\t\t\tValue:"+optValue, new Date().toISOString());

    });
  });


}

function play() {
  if (thePlayer) {
    console.log("[%s]	Playing Video", new Date().toISOString());
    thePlayer.playVideo();
  }
}

function pause() {
  if (thePlayer) {
    console.log("[%s]	Pausing Video", new Date().toISOString());
    thePlayer.pauseVideo();

  }

}

function playPauseToggle() {
  if(thePlayer) {
    var curState = thePlayer.getPlayerState()
    console.log("[%s]	Toggleing Video", new Date().toISOString());
    switch (curState) {
      case -1:
      console.log("[%s]	Video has not Started", new Date().toISOString());
      play();
      break;

      case 0:
      console.log("[%s]	Video has Ended", new Date().toISOString());
      rewind();
      play();
      break;

      case 1:
      console.log("[%s]	Video is Playing", new Date().toISOString());
      pause();
      break;

      case 2:
      console.log("[%s]	Video is Paused", new Date().toISOString());
      play();
      break;

      case 3:
      console.log("[%s]	Video is Bufffering.", new Date().toISOString());
      setTimeout(playPauseToggle,1000);
      break;

      case 5:
      console.log("[%s]	Video is Cued", new Date().toISOString());
      play();
      videoTitle.innerHTML =  "<a href=\""+thePlayer.getVideoUrl()+"\">["+episodeList.episode[video_number].id+"] "+episodeList.episode[video_number].title + "</a>";

      break;

      default:
      console.log("[%s]	tUnknown State, nothing to do.", new Date().toISOString());
      break;
    }
  }
}
function rewind() {
  seek(0);

}

function mute() {
  if(thePlayer) {
    thePlayer.mute();
  }
}

function unmute() {
  if(thePlayer) {
    thePlayer.unMute();
  }
}

function muteUnmuteToggle() { 
  if(thePlayer) {
    if(thePlayer.isMuted()) {
      unmute();
      } else {
      mute();
    }
  }
}

function seekBy(ammount) {
  currentPlayerTime = thePlayer.getCurrentTime();
  var direction = "";
  if(ammount < 0) {
    direction = "back";
    } else {
    direction = "forward";
  }
  console.log("[%s]	Seeking "+direction+" by "+Math.abs(ammount)+" seconds", new Date().toISOString());
  seek(currentPlayerTime+ammount);
}

function seek(time) {
  allowSeekAhead = true;
  if (time < 0) {
    time = 0;
  }
  if (time > thePlayer.getDuration()) {
    time = thePlayer.getDuration();
  }
  if (thePlayer) {
    console.log("[%s]	Seeking Video To "+time, new Date().toISOString());
    thePlayer.seekTo(time,allowSeekAhead);
  }
}

function seekTimecode(timeString) {

}

function nextVideo() {
  // cycle the video
  video_number++;
  if (video_number > (video_id.length -1) ) {
    video_number = 0;
  }
  loadVideo(video_id[video_number]);
}

function previousVideo() {
  // cycle the video
  video_number--;
  if (video_number < 0 ) {
    video_number = video_id.length - 1 ;
  }
  loadVideo(video_id[video_number]);
}

function randomVideo() {
  var rand_number = Math.floor(Math.random() * video_id.length);
  video_number =rand_number;

  loadVideo(video_id[video_number]);

}

function loadVideo(videoid) {
  if (thePlayer) {
    currentVideoDuration = undefined;
    var startTimeSeconds = 0;




    // thePlayer.loadVideoById(video_id[video_number],startTimeSeconds,quality);
    console.log("[%s]	Que'ing Video "+(video_number+1)+"/"+(video_id.length)+" [v="+video_id[video_number]+"]", new Date().toISOString());


    // if we are playing already, just start playing the next video
    var curState = thePlayer.getPlayerState();
    if (curState == 1 || curState == -1){
      isVideoCued = true;
    } 

    thePlayer.cueVideoById(videoid,startTimeSeconds,quality);


  }
}


//]]>