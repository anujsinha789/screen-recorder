chrome.browserAction.onClicked.addListener(function (activeTab) {
  var newURL = "https://scorder.xyz/";
  chrome.tabs.create({ url: newURL });
});
