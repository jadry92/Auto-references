const { ipcRenderer } = require('electron');
const { Reference } = require('./Reference');

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

function checkURLsRegex(URLs) {
  const wellURl = /^https?:\/\/.+$/g;
  for (const URL of URLs) {
    if (!wellURl.exec(URL)) {
      return false
    }
  }
  return true
}

function cleanData(formData) {
  const wellURL = /^https?:\/\/.+$/g;
  const normalURL = /^w?w?w?\.?.*\.[a-z]{2,5}\/[\w\/]{1,}/g;
  let data = []

  for (const row of formData) {
    let uid = 1
    let idName = "link-" + uid
    if (wellURL.exec(row)) {
      data.push({
        URL: row,
        verified: true,
        id: idName
      })
    } else if (normalURL.exec(row)) {
      data.push({
        URL: 'http://' + row,
        verified: true,
        id: idName
      })
    } else if (row === '') {

    } else {
      data.push({
        URL: row,
        verified: false,
        id: idName
      })
    }
    uid += 1
  }
  return data
}

function parserLinks(e) {
  const linksArea = document.getElementById('url')

  if (linksArea.value) {
    const rawData = linksArea.value.split("\n");
    const data = cleanData(rawData)
    const oldURLList = document.querySelectorAll("body > div > ul > li");
    if (oldURLList) {
      for (const dataURL of oldURLList) {
        dataURL.remove();
      }
    }

    const form = document.getElementById("urls-form-input")
    form.innerHTML = ''
    let links = []
    for (const item of data) {
      let itemList = ''
      if (item.verified) {
        itemList = `<p class="item-link">${item.URL}<p>`
        links.push(item.URL)
      } else {
        itemList = `<input value="${item.URL}" id="${item.id}" type="text" class="validate invalid">`
      }
      form.innerHTML = form.innerHTML + itemList
    }
    ipcRenderer.send('submit-form', links)
  }
}

function show_cli(event) {
  const elemIl = event.target
  elemIl.innerHTML = `
  <form action="" id="ref_form">
    <label for="title" style="color: white;">Title</label>
    <input type="text" name="title">
    <label for="title" style="color: white;">Last Name</label>
    <input type="text" name="title">
    <label for="title" style="color: white;">First Name</label>
    <input type="text" name="title">
    <label for="title" style="color: white;">Year of Publish</label>
    <input type="text" name="title">
  </form>
`;
}

function setIpc() {
  ipcRenderer.on("scraping-data", (event, dataList) => {
    const referencesContainer = document.querySelector("ul.list-group");

    for (data of dataList) {
      let ref = new Reference(data)
      console.log(ref);
      const node = ref.render()
      referencesContainer.insertAdjacentElement("beforeEnd", node);
    }
  })
}



/*
https://en.wikipedia.org/wiki/Internet_protocol_suite
https://www.youtube.com/watch?v=K0ibBPhiaG0
https://stackoverflow.com/questions/38296667/getting-unexpected-token-export
*/




