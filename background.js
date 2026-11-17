// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// TODO: enable more intelligent tab selection
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
    chrome.tabs.sendMessage(hotmart_player_tab, { type: 'play_pause' });
  } else if (command === "jump_forward") {
    // Handle jump forward command
    console.log('Jump forward command triggered');
    chrome.tabs.sendMessage(hotmart_player_tab, { type: 'jump_forward' });
  } else if (command === "jump_backward") {
    // Handle jump backward command
    console.log('Jump backward command triggered');
    chrome.tabs.sendMessage(hotmart_player_tab, { type: 'jump_backward' });
  }
});

// catch the message from content.js to set the hotmart_player_tab
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === 'set_hotmart_player_tab') {
    console.log('Setting hotmart_player_tab to tabId:', sender.tab.id);
    hotmart_player_tab = sender.tab.id;
  }
});
