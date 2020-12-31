const fetch = require("node-fetch");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// regexps
const titleRegex = /^.+\s[\|\-\.]\s([\w\s]{4,30})$/g;
const yearRegex = /^.*(\d\d\d\d).*$/g;

function getDataWiki(dom) {
  data = {}
  // title 
  const h1Text = dom.window.document.querySelector("h1").textContent;
  const titleText = dom.window.document.querySelector("title").textContent;
  data.title = titleText.match(h1Text)[0];

  // Author data
  data.authorName = 'wikipedia'
  data.authorSurname = 'wikipedia'
  // Dates
  const objDate = new Date();
  data.visitDate = objDate.getFullYear().toString();

  const lastModText = dom.window.document.querySelector("#footer-info-lastmod").textContent;
  data.yearPublish = yearRegex.exec(lastModText)[1];

  return data;
}

function getAllFuncs(toCheck) {
  var props = [];
  var obj = toCheck;
  do {
    props = props.concat(Object.getOwnPropertyNames(obj));
  } while (obj = Object.getPrototypeOf(obj));

  return props.sort().filter(function (e, i, arr) {
    if (e != arr[i + 1] && typeof toCheck[e] == 'function') return true;
  });
}

function getDataYouTube(dom) {
  data = {}

  const linkTags = dom.window.document.querySelectorAll("link");
  for (const tag of linkTags) {
    if (tag.getAttribute('itemprop') === 'name') {
      data.authorName = tag.getAttribute('content');
      data.authorSurname = tag.getAttribute('content');
    }
  }

  // Dates
  const objDate = new Date();
  data.visitDate = objDate.getFullYear().toString();
  const metaTags = dom.window.document.querySelectorAll("meta");
  for (const tag of metaTags) {
    if (tag.getAttribute('itemprop') === 'datePublished') {
      const textDate = yearRegex.exec(tag.getAttribute('content'))
      data.yearPublish = (textDate ? textDate[1] : tag.getAttribute('content'));
    } else if (tag.getAttribute('itemprop') === 'name') {
      data.title = tag.getAttribute('content');
    }
  }

  return data;
}

function getData(dom) {
  data = {}
  // title 
  const h1Text = dom.window.document.querySelector("h1").textContent;
  const titleText = dom.window.document.querySelector("title").textContent;
  data.title = (titleText.match(h1Text) ? titleText.match(h1Text)[0] : titleText);
  // Author data
  const title = titleRegex.exec(titleText)
  data.authorName = (title ? title[1] : titleText)
  data.authorSurname = (title ? title[1] : titleText)
  // Dates
  const objDate = new Date();
  data.visitDate = objDate.getFullYear();
  data.yearPublish = '';

  return data;
}

async function scrapingData(links) {
  dataList = []
  for (const link of links) {
    data = {}
    try {
      const response = await fetch(link);
      const text = await response.text();
      const dom = await new JSDOM(text);
      if (link.match('^.+wikipedia\.org.+$')) {
        data = await getDataWiki(dom)
      } else if (link.match('^.+youtube\.com.+$')) {
        data = await getDataYouTube(dom)
      } else {
        data = await getData(dom);
      }
      data.URL = link
      dataList.push(data)
    } catch (error) {
      console.log(error);
    }
  }
  return dataList
}


module.exports = { scrapingData }
