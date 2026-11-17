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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setup, { once: true });
} else {
  setup();
}

function addEventListeners() {
  const video = document.querySelector('video');

  // on play/pause, set the hotmart_player_tab in background.js to the current tab
  const setHotmartPlayerTab = (event) => {
    console.log(`Setting hotmart_player_tab to current tab (${event.type})`);
    chrome.runtime.sendMessage({ type: 'set_hotmart_player_tab' });
  };
  video.addEventListener('play', setHotmartPlayerTab);
  video.addEventListener('pause', setHotmartPlayerTab);

  // add play_pause listener
  chrome.runtime.onMessage.addListener((message) => {
    switch (message.type) {
      case 'play_pause':
        console.log('Play/Pause command received in content script');
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
        break;
      case 'jump_forward':
        console.log('Jump forward command received in content script');
        video.currentTime += 10; // jump forward 10 seconds
        break;
      case 'jump_backward':
        console.log('Jump backward command received in content script');
        video.currentTime -= 10; // jump backward 10 seconds
        break;
    }
  });
}