'use strict';


chrome.contextMenus.create({
    title: "This is your chrome extension menu!",
    id: 'selectFromContextMenu',
    contexts: ["all"]
}, function () {
    var error = chrome.runtime.lastError;
    if (error) {
        console.log(error);
    }
    else {
        console.log('Context menu created');
    }
});

chrome.browserAction.onClicked.addListener(function (tab) {
    alert('icon clicked')
});