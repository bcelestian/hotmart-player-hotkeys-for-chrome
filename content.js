// content.js
function setup() {
  if (!window.location.href.startsWith("https://player.hotmart.com")) {
    return;
  }
  console.log('Content script loaded');

  // wait for player to load, then attach the listeners
  const playerInterval = setInterval(() => {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      clearInterval(playerInterval);
      console.log('Video element found, adding event listeners');
      addEventListeners();
    }
  }, 1000);

  //



}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setup, { once: true });
} else {
  setup();
}

function addEventListeners() {
  const video = document.querySelector('video');

  // on play/pause, set the hotmart_player_tab in background.js to the current tab
  video.addEventListener('play', () => {
    console.log('Setting hotmart_player_tab to current tab');
    chrome.runtime.sendMessage({ type: 'set_hotmart_player_tab', tabId: chrome.devtools.inspectedWindow.tabId });
  });

  // add play_pause listener
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'play_pause') {
      console.log('Play/Pause command received in content script');
    }
  });
}