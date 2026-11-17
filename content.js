// content.js
document.addEventListener('DOMContentLoaded', () => {
  // Example: Add a custom button to all text inputs
  const textInputs = document.querySelectorAll('input[type="text"]');
  textInputs.forEach(input => {
    const button = document.createElement('button');
    button.textContent = '✨';
    button.className = 'my-extension-button';
    input.parentNode.insertBefore(button, input.nextSibling);
  });
});