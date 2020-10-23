const { ipcRenderer } = require('electron');

window.addEventListener('load', () => {
  buttonEvent('scrapping', parserLinks);
  typingKeyboard();
  setIpc();
})

function buttonEvent(id, func) {
  const button = document.getElementById(id);
  button.addEventListener('click', func);
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
    const formData = linksArea.value.split("\n");
    const dataURLList = document.querySelectorAll("body > div > ul > li");
    if (dataURLList) {
      for (const dataURL of dataURLList) {
        dataURL.remove();
      }
    }
    data = ipcRenderer.send('submit-form', formData);
  }
}
function show_cli(event) {
  console.log('asd->' + event);
}
function setIpc() {
  ipcRenderer.on('scraping-data', (event, dataURLs) => {
    const dataURLList = document.querySelector('ul.list-group')
    console.log(dataURLList);
    for (data of dataURLs) {
      const node = document.createElement("li")//`<li class="references" >${data.title}</li>`
      node.innerHTML = data.title
      node.classList.add('references')
      node.addEventListener("click", show_cli)
      console.log(node)
      //dataURLList.insertAdjacentHTML('beforeend', node)
      dataURLList.insertAdjacentElement('beforeEnd', node)
    }
  })
}


/*
https://en.wikipedia.org/wiki/Internet_protocol_suite
https://www.youtube.com/watch?v=qs_BiGgtJPk
*/






