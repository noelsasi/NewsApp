const ul = document.getElementById("news");
const apiKey = "615db19d328644f08f2c22856e6efe89";

var vars = {};
var parts = window.location.href.replace(
  /[?&]+([^=&]+)=([^&]*)/gi,
  (m, key, value) => {
    vars[key] = value;
  }
);
console.log(vars.query);
const query = vars.query;
const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
console.log(url);

// creating nodeElements
createNode = element => {
  return document.createElement(element);
};

append = (parent, el) => {
  return parent.appendChild(el);
};

// fetching data...
fetch(url)
  .then(resp => resp.json())
  .then(data => {
    let articles = data.articles;
    console.log(data);
    if (articles.length === 0) {
      console.log(articles.length);
      let li = createNode("li"),
        h4 = createNode("h4");
      h4.innerHTML = `No Data Available`;
      append(ul, li);
      append(li, h4);
    }
    return articles.map(article => {
      let li = createNode("li"),
        img = createNode("img"),
        imgWrapper = createNode("div"),
        div = createNode("div"),
        cardtext = createNode("div");
      div.setAttribute("class", "news-card");
      cardtext.setAttribute("class", "card-text");
      imgWrapper.setAttribute("class", "card-img");
      p = createNode("p");
      h4 = createNode("h4");
      img.src = article.urlToImage;
      h4.innerHTML = `${article.author}`;
      p.innerHTML = `${article.content}`;
      p.innerHTML = `${article.description}`;
      append(ul, li);
      append(li, div);
      append(div, imgWrapper);
      append(div, cardtext);
      append(imgWrapper, img);
      append(cardtext, h4);
      append(cardtext, p);
    });
  });

// refresh timer
let timeLeft = 30;
let timer = document.getElementById("refresh");

let timerId = setInterval(countdown, 1000);

function countdown() {
  if (timeLeft == -1) {
    location.reload();
    clearTimeout(timerId);
  } else {
    timer.innerHTML = "Auto refresh in " + timeLeft;
    timeLeft--;
  }
}
