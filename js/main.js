const ul = document.getElementById("news");
const apiKey = "615db19d328644f08f2c22856e6efe89";

let vars = {};
let parts = window.location.href.replace(
  /[?&]+([^=&]+)=([^&]*)/gi,
  (m, key, value) => {
    vars[key] = value;
  }
);
let query = "recent";

if (vars.query) {
  query = vars.query;
  document.getElementById(
    "search-query"
  ).innerHTML = `results for your search " <b>${query} </b> "`;
}

const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
console.log(url);

// creating nodeElements
createNode = element => {
  return document.createElement(element);
};

append = (parent, el) => {
  return parent.appendChild(el);
};

checkData = data => {
  if (data == null || undefined) {
    return "Sorry, no data available";
  } else {
    return data;
  }
};

noImage = img => {
  if (img == null || undefined) {
    const imgUrl = "../img/noimage.png";
    return imgUrl;
  } else {
    return img;
  }
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
        div = createNode("div"),
        img = createNode("img"),
        imgWrapper = createNode("div"),
        cardtext = createNode("div"),
        cntSource = createNode("span"),
        timeago = createNode("span"),
        p = createNode("p"),
        h4 = createNode("h4");

      div.setAttribute("class", "news-card");
      cardtext.setAttribute("class", "card-text");
      imgWrapper.setAttribute("class", "card-img");
      cntSource.setAttribute("class", "source");
      timeago.setAttribute("class", "time");

      img.src = noImage(article.urlToImage);
      h4.innerHTML = checkData(article.title);
      p.innerHTML = checkData(article.content);
      cntSource.innerHTML = checkData(article.source.name);
      let timestamp = new Date(article.publishedAt).getTime();
      let todate = new Date(timestamp).getDate();
      let tomonth = new Date(timestamp).getMonth() + 1;
      let toyear = new Date(timestamp).getFullYear();
      let original_date = tomonth + "/" + todate + "/" + toyear;
      timeago.innerHTML = checkData(original_date);

      append(ul, li);
      append(li, div);
      append(div, imgWrapper);
      append(div, cardtext);
      append(imgWrapper, img);
      append(cardtext, h4);
      append(cardtext, p);
      append(cardtext, cntSource);
      append(cardtext, timeago);
    });
  });

// refresh timer
let timeLeft = 60;
let timer = document.getElementById("refresh");

let timerId = setInterval(countdown, 1000);

function countdown() {
  if (timeLeft == -1) {
    location.reload();
    clearTimeout(timerId);
  } else {
    timer.innerHTML = `Auto refresh in  <b>${timeLeft} seconds</b>`;
    timeLeft--;
  }
}
