chrome.browserAction.onClicked.addListener(function (activeTab) {
  var newURL = "http://scorder.netlify.com/";
  chrome.tabs.create({ url: newURL });
});
