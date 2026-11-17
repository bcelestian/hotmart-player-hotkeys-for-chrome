// content.js
function setup() {
  console.log('Content script loaded');
  // Example: Add a custom button to all text inputs
  const textInputs = document.querySelectorAll('input[type="search"]');
  textInputs.forEach(input => {
    const button = document.createElement('button');
    button.textContent = '✨';
    button.className = 'my-extension-button';
    input.parentNode.insertBefore(button, input.nextSibling);

    button.addEventListener('click', () => {
      const searchTerm = input.value;
      console.log('Search term:', searchTerm);
      // You can send this search term to the background script or perform other actions
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setup, { once: true });
} else {
  setup();
}