const ipcRenderer = require('electron');

window.addEventListener('load', () => {
  buttonEvent('scrapping', parserLinks);
  typingKeyboard();
})

function buttonEvent(id, func) {
  const button = document.getElementById(id)
  button.addEventListener('click', func)
}

function typingKeyboard() {
  const linksArea = document.getElementById('url')
  linksArea.addEventListener('onkeyup', (e) => {
    console.log(e);
  })
}

function parserLinks(e) {
  e.preventDefault();
  const linksArea = document.getElementById('url')
  if (linksArea.value) {
    const formData = linksArea.value.split("\n")
    ipcRenderer.send('submit-form', formData);
  }
}










