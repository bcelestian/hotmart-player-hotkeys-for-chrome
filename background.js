// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// TODO: make it a stack of tabs
let hotmart_player_tab = null;

chrome.commands.onCommand.addListener((command) => {
  console.log(`Command received: ${command}`);

  if (hotmart_player_tab === null) {
    console.log("no active hotmart_player_tab, ignoring command");
    return;
  }

  if (command === "play_pause") {
    // Handle play/pause command
    console.log('Play/Pause command triggered');
    chrome.tabs.sendMessage(hotmart_player_tab, { type: 'play_pause' }, handleResponse);
  } else if (command === "jump_forward") {
    // Handle jump forward command
    console.log('Jump forward command triggered');
    chrome.tabs.sendMessage(hotmart_player_tab, { type: 'jump_forward' }, handleResponse);
  } else if (command === "jump_backward") {
    // Handle jump backward command
    console.log('Jump backward command triggered');
    chrome.tabs.sendMessage(hotmart_player_tab, { type: 'jump_backward' }, handleResponse);
  }
});

// catch the message from content.js to set the hotmart_player_tab
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'set_hotmart_player_tab') {
    console.log('Setting hotmart_player_tab to tabId:', message.tabId);
    hotmart_player_tab = message.tabId;
  }
});

function handleResponse(response) {
  if (chrome.runtime.lastError) {
    console.error('Error sending message to content script:', chrome.runtime.lastError);
  } else {
    console.log('Response from content script:', response);
  }
}