var script = document.createElement("script");
script.src = chrome.extension.getURL("lib/revealVideosLib.js");
console.log(script.src);
console.log(script);
document.head.appendChild(script);

getVideoList();
