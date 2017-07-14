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
            console.log("the vids: "+videos);
            doTheVidThing(videos);
        }
            );
  });
}

function addVideosToPopup(videos) {
    try {
        var len = videos.length;
        var button = document.getElementById("findVideosButton");
        var par = button.parentNode;
        par.removeChild(button);
        for (v=0;v<len;v++){
            var vidDivs = document.createElement("div");
            vidDivs.class = "vid";
            var videoTag = document.createElement("video");
            videoTag.controls="controls";
            var sourceTag = document.createElement("source");
            sourceTag.src = videos[v];
            sourceTag.type = "video/mp4";
            videoTag.appendChild(sourceTag);
            vidDivs.appendChild(videoTag);
            document.body.appendChild(vidDivs);
        }
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
    try{
        videos[0].length;
        addVideosToPopup(videos);
    }catch (err){
        console.log(err);
        noVideosToPopup();
    }
}
