document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('findVideosButton');
  checkPageButton.addEventListener('click', searchVideosInDocument)
});


searchVideosInDocument = function(){
  chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
    chrome.tabs.executeScript(
                tabs[0].id,
                {file: "getVideos.js"},
        function(videos){
            console.log(videos);
            doTheVidThing(videos);
        }
            );
  });
}

function addVideosToPopup(videos) {
    try {
        var len = videos.length;
        var vidDivs = [];
        for (v=0;v<len;v++){
            vidDivs[v] = document.createElement("div");
            vidDivs[v].class = "vid";
            var videoTag = document.createElement("video");
            videoTag.src = videos[v];
            vidDivs[v].appendChild(videoTag);
        }
        document.body.appendChild(vidDivs);
    }catch (err){
        console.log(err);
    }
}

function noVideosToPopup() {
    var div = document.createElement("div");
    var text = document.createTextNode("No video found!");
    div.appendChild(text);
    document.body.appendChild(div);
}

function doTheVidThing(videos) {
    if(videos.length == 0){
        noVideosToPopup();
    }else{
        addVideosToPopup();
    }
}
