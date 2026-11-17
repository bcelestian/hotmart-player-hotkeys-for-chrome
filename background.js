// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.commands.onCommand.addListener((command) => {
    console.log(`Command received: ${command}`);
    
    if (command === "play_pause") {
        // Handle play/pause command
        console.log('Play/Pause command triggered');
    } else if (command === "jump_forward") {
        // Handle jump forward command
        console.log('Jump forward command triggered');
    } else if (command === "jump_backward") {
        // Handle jump backward command
        console.log('Jump backward command triggered');
    }
});

