//<![CDATA[

/*
  This code generates the list of episodes on the left.
  For now, it just uses the data imported into the episodeList & timecodeList global variable.

*/


var booklist = new Array();

console.group("Loading Episode Meta Data");
console.time("Loading Episode Meta Data");

if (episodeList == null) {
  console.warn("[%s] Episode list data was not found.", new Date().toISOString());
} else { 
  console.log("[%s] Episode list data was found. Loaded %d entries", new Date().toISOString(),episodeList.episode.length);
}

if (timecodeList == null) {
  console.warn("[%s] Timecode list data was not found.", new Date().toISOString());
} else { 
  var timecodeCount = 0;
  timecodeList.episode.forEach(function(episode) { timecodeCount += episode.timecodes.length; } );
  console.log("[%s] Timecode list data was found. Loaded %d entries", new Date().toISOString(), timecodeCount);
}

var video_id = new Array();

var videoList = document.getElementById('video-list');




//populate the list of videos
episodeList.episode.forEach( function(episode) { 

  if(!(episode.youtube_id === "" || episode.youtube_id == undefined)){
    //console.log("[%s]	"+episode.id+" "+episode.youtube_id, new Date().toISOString());
    video_id.push(episode.youtube_id);
    videoList.innerHTML += '<div id="episode_'+episode.id+'_group"></div>';
    var videoEpisodeEntry = document.getElementById('episode_'+episode.id+'_group');
    videoEpisodeEntry.innerHTML += '<a id="episode_'+episode.id+'_link" href="javascript:void(0);" onclick="video_number='+(episode.id-1)+';loadVideo(\''+episode.youtube_id+'\');">['+episode.id+'] '+episode.title+'</a>';
    
    videoEpisodeEntry.innerHTML += '<a target="_blank" href="https://youtube.com/watch?v='+episode.youtube_id+'"> (↪)</a>';
    
    //populate the list of timecodes for this video
    //TODO make the timecode into an associative array so i can do timecodes[video_id] to get the array of time codes.
    //     this is to avoid the filter and forEach loop that is taking a long time
    var timecodesForCurrentEpisode = timecodeList.episode.filter(function(timestampEpisode) {return timestampEpisode.id === episode.id});			

    if(!(timecodesForCurrentEpisode == undefined || timecodesForCurrentEpisode[0] == undefined)) {
      console.log("TIMECODES!");
      videoEpisodeEntry.innerHTML += '<div id="episode_'+episode.id+'_timecodes"></div>';
      var videoEpisodeTimecodes =document.getElementById('episode_'+episode.id+'_timecodes');
      
        timecodesForCurrentEpisode[0].timecodes.forEach( function(timecode) {
          videoEpisodeTimecodes.innerHTML += '  <a class="timecode-link" href="javascript:void(0);" onclick="seekTimecode(\''+timecode.start+'\')">['+timecode.start+'] '+timecode.description+'</a>';
        });
    }

    
    


  }
});

console.timeEnd("Loading Episode Meta Data");
console.groupEnd(); 
//]]>
