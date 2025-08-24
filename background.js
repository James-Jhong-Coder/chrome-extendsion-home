chrome.runtime.onInstalled.addListener(() => {
    console.log("onStartup!!!");
    chrome.tabs.create({
        url: chrome.runtime.getURL("index.html"), // 或者 options.html、index.html
    });
});

chrome.action.onClicked.addListener(() => {
    console.log("onClicked!!!");
    chrome.tabs.create({ url: "index.html" });
});
