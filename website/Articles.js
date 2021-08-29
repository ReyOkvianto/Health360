let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=workout%20tips&api-key=bTu4YnyczT4l30wcC2znZrfRcT5CSpgz";
let url2 = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=losing%20body%20weight&api-key=bTu4YnyczT4l30wcC2znZrfRcT5CSpgz";
let url3 = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=how%20to%20gain%20muscles&api-key=bTu4YnyczT4l30wcC2znZrfRcT5CSpgz";
// let url = "https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=bTu4YnyczT4l30wcC2znZrfRcT5CSpgz";


let headlines = document.getElementById("headlines");


fetch(url)
.then(response => response.json())
.then(data => {
    console.log(data);

    data.response.docs.map(article => {

        console.log(article.headline.main);

        let card = document.createElement("div");
        card.setAttribute('class', "card");
        card.setAttribute('style', "width: 30%; height: 700px; border-radius: 10px; margin-left: 20px; margin-right: 20px; margin-bottom: 10px; margin-right:5px; float: left; background: #defaff; box-shadow: 1px 1px 20px #00e25e3a;")

        let cardBody = document.createElement("div");
        card.setAttribute('class', "card-body");

        let h5 = document.createElement("h5");
        h5.setAttribute('class', "card-title");
        h5.innerHTML = article.headline.main;

        let p = document.createElement("p");
        p.setAttribute('class', "card-text");
        p.innerHTML = article.abstract;

        let a = document.createElement("a");
        a.setAttribute('class', "btn btn-primary");
        a.setAttribute('href', article.web_url);
        a.setAttribute('target', "_blank");
        //a.setAttribute('style', "border-color: #5e72e4; background-color: #5e72e4;");

        a.innerHTML = "View Article";

        let img = document.createElement("img");
        img.setAttribute('class', "card-img-top");
        if(article.multimedia.length != 0){
            img.setAttribute('src', "http://www.nytimes.com/" + article.multimedia[0].url);
        } else {
            img.setAttribute('src', "./images/defaultPic.jpg");
        }

        cardBody.appendChild(h5);
        cardBody.appendChild(p);
        cardBody.appendChild(a);

        card.appendChild(img);
        card.appendChild(cardBody);

        headlines.appendChild(card);


    })
})


fetch(url2)
.then(response => response.json())
.then(data => {
    console.log(data);

    data.response.docs.map(article => {

        console.log(article.headline.main);

        let card = document.createElement("div");
        card.setAttribute('class', "card");
        card.setAttribute('style', "width: 30%; height: 700px; border-radius: 10px; margin-left: 20px; margin-right: 20px; margin-bottom: 10px; margin-right:5px; float: left; background: #defaff; box-shadow: 1px 1px 20px #00e25e3a;")

        let cardBody = document.createElement("div");
        card.setAttribute('class', "card-body");

        let h5 = document.createElement("h5");
        h5.setAttribute('class', "card-title");
        h5.innerHTML = article.headline.main;

        let p = document.createElement("p");
        p.setAttribute('class', "card-text");
        p.innerHTML = article.abstract;

        let a = document.createElement("a");
        a.setAttribute('class', "btn btn-primary");
        a.setAttribute('href', article.web_url);
        a.setAttribute('target', "_blank");
        //a.setAttribute('style', "border-color: #5e72e4; background-color: #5e72e4;");

        a.innerHTML = "View Article";

        let img = document.createElement("img");
        img.setAttribute('class', "card-img-top");
        if(article.multimedia.length != 0){
            img.setAttribute('src', "http://www.nytimes.com/" + article.multimedia[0].url);
        } else {
            img.setAttribute('src', "./images/defaultPic.jpg");
        }

        cardBody.appendChild(h5);
        cardBody.appendChild(p);
        cardBody.appendChild(a);

        card.appendChild(img);
        card.appendChild(cardBody);

        headlines.appendChild(card);


    })
})

fetch(url3)
.then(response => response.json())
.then(data => {
    console.log(data);

    data.response.docs.map(article => {

        console.log(article.headline.main);

        let card = document.createElement("div");
        card.setAttribute('class', "card");
        card.setAttribute('style', "width: 30%; height: 700px; border-radius: 10px; margin-left: 20px; margin-right: 20px; margin-bottom: 10px; margin-right:5px; float: left; background: #defaff; box-shadow: 1px 1px 20px #00e25e3a;")

        let cardBody = document.createElement("div");
        card.setAttribute('class', "card-body");

        let h5 = document.createElement("h5");
        h5.setAttribute('class', "card-title");
        h5.innerHTML = article.headline.main;

        let p = document.createElement("p");
        p.setAttribute('class', "card-text");
        p.innerHTML = article.abstract;

        let a = document.createElement("a");
        a.setAttribute('class', "btn btn-primary");
        a.setAttribute('href', article.web_url);
        a.setAttribute('target', "_blank");
        //a.setAttribute('style', "border-color: #5e72e4; background-color: #5e72e4;");

        a.innerHTML = "View Article";

        let img = document.createElement("img");
        img.setAttribute('class', "card-img-top");
        if(article.multimedia.length != 0){
            img.setAttribute('src', "http://www.nytimes.com/" + article.multimedia[0].url);
        } else {
            img.setAttribute('src', "./images/defaultPic.jpg");
        }

        cardBody.appendChild(h5);
        cardBody.appendChild(p);
        cardBody.appendChild(a);

        card.appendChild(img);
        card.appendChild(cardBody);

        headlines.appendChild(card);


    })
})