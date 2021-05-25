const { ipcRenderer } = require('electron');
import ReferencesTemplate from './ReferencesTemplate'
import { ReferenceData } from '../References'

window.addEventListener('load', () => {
  //const objectReference = new References()
  // User interactions
  buttonEvent('scrapping', parserLinks);
  typingKeyboard();
  // Communication with the core
  setIpc();
})

function setIpc() {
  ipcRenderer.on('data-ready', (event: Event, dataList: [ReferenceData]) => {
    const listRef = new ReferencesTemplate(dataList)
    listRef.render()
  })
}

function toggleTextArea() {
  const formDiv = <HTMLInputElement>document.getElementById('urls-form-input')
  const title = <HTMLInputElement>document.getElementById('form-title')
  formDiv.hidden = !formDiv.hidden
  title.hidden = !title.hidden
}

function toggleButtons() {
  const btnScrapping = <HTMLInputElement>document.getElementById('scrapping')
  const btnReset = <HTMLInputElement>document.getElementById('reset')
  if (btnScrapping.classList.contains('disabled')) {
    btnScrapping.classList.remove('disabled')
    btnScrapping.classList.add('primary-btn')
    btnReset.classList.remove('primary-btn')
    btnReset.classList.add('disabled')
  } else {
    btnReset.classList.remove('disabled')
    btnScrapping.classList.remove('primary-btn')
    btnScrapping.classList.add('disabled')
    btnReset.classList.add('primary-btn')
  }
  console.log(btnScrapping.classList);

  console.log(btnReset.classList);
}

function parserLinks(event: MouseEvent): void {
  const linksArea = <HTMLInputElement>document.getElementById('url')
  if (linksArea.value) {
    const rawData = linksArea.value.split("\n");
    const dataList = cleanData(rawData)
    toggleTextArea()
    toggleButtons()
    console.log(dataList);


    const form = document.getElementById("urls-form-input")
    form.innerHTML = ''
    let links = []
    for (const item of dataList) {
      let itemList = ''
      if (item.verified) {
        itemList = `<p class="item-link">${item.URL}<p>`
        links.push(item.URL)
      } else {
        itemList = `<input value="${item.URL}" id="${item.id}" type="text" class="validate invalid">`
      }
      form.innerHTML = form.innerHTML + itemList
    }
    ipcRenderer.send('submit-form', dataList)
  }
}

function buttonEvent(id: string, func: (event: MouseEvent) => void) {
  const button = document.getElementById(id);
  button.addEventListener('click', func);
}

function typingKeyboard() {
  const linksArea = document.getElementById('url')
  linksArea.addEventListener('onkeyup', (e) => {
    console.log(e);
  })
}

function cleanData(formData: string[]) {
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


/*
function show_cli(event: Event) {
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
*/




/*
https://en.wikipedia.org/wiki/Internet_protocol_suite
https://www.youtube.com/watch?v=K0ibBPhiaG0
https://stackoverflow.com/questions/38296667/getting-unexpected-token-export
*/




