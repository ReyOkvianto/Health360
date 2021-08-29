const app = document.getElementById('root');
var oldroot = app.innerHTML; 
// console.log(oldroot);
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);
var imageUrl = [];

const searchEnter = document.getElementById('wo-searchBar');
const searchBtn = document.getElementById('wo-searchBtn');
const abBtn = document.getElementById('ab-btn');
const chestBtn = document.getElementById('chest-btn');
const armBtn = document.getElementById('arm-btn');
const legBtn = document.getElementById('leg-btn');
const clearBtn = document.getElementById('clear-btn'); 

abBtn.addEventListener('click', displayAbs);
chestBtn.addEventListener('click', displayChest);
armBtn.addEventListener('click', displayArms);
legBtn.addEventListener('click', displayLegs);
searchBtn.addEventListener('click', searchExercise);
clearBtn.addEventListener('click', btnTester);

searchEnter.addEventListener("keyup", function(event) {
  if (event.keyCode == 13 || event.key=="Enter") {
    event.preventDefault();
    searchBtn.click();
  }
}); 

function btnTester() {
  console.log("button clicked");
  window.location.reload(); 
}
// var request2 = new XMLHttpRequest();
// request2.open('GET', 'https://wger.de/api/v2/exerciseimage/?format=json&muscles=6&language=2', true);
// request2.onload = function () {
//   // Begin accessing JSON data here
//   var data2 = JSON.parse(this.response);
//   if (request2.status >= 200 && request2.status < 400) {
//     data2.results.forEach(exer => {
//         // const card = document.createElement('div');
//         // card.setAttribute('class', 'card');

//         const img = document.createElement('img');
//         img.src = exer.image;
//         img.width = 300;
//         img.height = 400;
//         img.style = "display: block; margin-left: auto; margin-right: auto;"; 
//         imageUrl.push(img);
//         // console.log(imageUrl[0].src);
//     });
//   }
//   else {
//     const errorMessage = document.createElement('marquee');
//     errorMessage.textContent = `Error`;
//     app.appendChild(errorMessage);
//   }
// }
// var i = 0;
// request2.send(); 
// https://wger.de/api/v2/exerciseinfo/?format=json&language=2&limit=226 USE THIS FOR ONE REQUEST WITH IMAGES
// var type
function displayAbs(type) {
  var request = new XMLHttpRequest();
  request.open('GET', `https://wger.de/api/v2/exercise/?format=json&language=2&muscles=6,14`, true);
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    console.log(data);
    if (request.status >= 200 && request.status < 400) {
      data.results.forEach(exercise => {
          const card = document.createElement('div');
          card.setAttribute('class', 'card');
          const img = document.createElement('img');
          const h2 = document.createElement('h2');
          const p = document.createElement('p');
          
          // console.log(exercise.images[0]);
          // img.src = exercise.images[0].image; 
          h2.textContent = exercise.name;

          exercise.description = exercise.description.substring(0, 500);
          var longDes = false;
          if (exercise.description.length > 500) {
              longDes = true;
          }
          if (longDes) {
              p.textContent = `${exercise.description}...`.split('/').join('');
          }
          else {
              p.textContent = `${exercise.description}`.split('/').join('');
          }
          p.textContent = p.textContent.replace(/<p>/g, '');
          // Filter out low effort description
          if (p.textContent.length > 10) {
              container.appendChild(card);
              card.appendChild(h2);
              card.appendChild(img);
              card.appendChild(p);

          }
      });
    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Error`;
      app.appendChild(errorMessage);
    }
  }
  request.send();
}

function displayLegs() {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://wger.de/api/v2/exercise/?format=json&language=2&muscles=7,8,10,11', true);
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    console.log(data);
    if (request.status >= 200 && request.status < 400) {
      data.results.forEach(exercise => {
          const card = document.createElement('div');
          card.setAttribute('class', 'card');
          const img = document.createElement('img');
          const h2 = document.createElement('h2');
          const p = document.createElement('p');

          
          // console.log(exercise.images[0]);
          // img.src = exercise.images[0].image; 
          h2.textContent = exercise.name;


          exercise.description = exercise.description.substring(0, 500);
          var longDes = false;
          if (exercise.description.length > 500) {
              longDes = true;
          }
          if (longDes) {
              p.textContent = `${exercise.description}...`.split('/').join('');
          }
          else {
              p.textContent = `${exercise.description}`.split('/').join('');
          }
          p.textContent = p.textContent.replace(/<p>/g, '');
          // Filter out low effort description
          if (p.textContent.length > 10) {
              container.appendChild(card);
              card.appendChild(h2);
              card.appendChild(img);
              card.appendChild(p);
          }
      });
    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Error`;
      app.appendChild(errorMessage);
    }
  }
  request.send();
}

function displayChest() {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://wger.de/api/v2/exercise/?format=json&language=2&muscles=4', true);
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    console.log(data);
    if (request.status >= 200 && request.status < 400) {
      data.results.forEach(exercise => {
          const card = document.createElement('div');
          card.setAttribute('class', 'card');
          const img = document.createElement('img');
          const h2 = document.createElement('h2');
          const p = document.createElement('p');
          
          // console.log(exercise.images[0]);
          // img.src = exercise.images[0].image; 
          h2.textContent = exercise.name;

          exercise.description = exercise.description.substring(0, 500);
          var longDes = false;
          if (exercise.description.length > 500) {
              longDes = true;
          }
          if (longDes) {
              p.textContent = `${exercise.description}...`.split('/').join('');
          }
          else {
              p.textContent = `${exercise.description}`.split('/').join('');
          }
          p.textContent = p.textContent.replace(/<p>/g, '');
          // Filter out low effort description
          if (p.textContent.length > 10) {
              container.appendChild(card);
              card.appendChild(h2);
              card.appendChild(img);
              card.appendChild(p);
          }
      });
    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Error`;
      app.appendChild(errorMessage);
    }
  }
  request.send();
}

function displayArms() {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://wger.de/api/v2/exercise/?format=json&language=2&muscles=1,5,13', true);
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    console.log(data);
    if (request.status >= 200 && request.status < 400) {
      data.results.forEach(exercise => {
          const card = document.createElement('div');
          card.setAttribute('class', 'card');
          const img = document.createElement('img');
          const h2 = document.createElement('h2');
          const p = document.createElement('p');
          
          // console.log(exercise.images[0]);
          // img.src = exercise.images[0].image; 
          h2.textContent = exercise.name;


          exercise.description = exercise.description.substring(0, 500);
          var longDes = false;
          if (exercise.description.length > 500) {
              longDes = true;
          }
          if (longDes) {
              p.textContent = `${exercise.description}...`.split('/').join('');
          }
          else {
              p.textContent = `${exercise.description}`.split('/').join('');
          }
          p.textContent = p.textContent.replace(/<p>/g, '');
          // Filter out low effort description
          if (p.textContent.length > 10) {
              container.appendChild(card);
              card.appendChild(h2);
              card.appendChild(img);
              card.appendChild(p);
          }
      });
    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Error`;
      app.appendChild(errorMessage);
    }
  }
  request.send();
}

function displayExercise() {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://wger.de/api/v2/exerciseinfo/?format=json&language=2&limit=20', true);
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      data.results.forEach(exercise => {
          const card = document.createElement('div');
          card.setAttribute('class', 'card');
          const img = document.createElement('img');
          const h2 = document.createElement('h2');
          const p = document.createElement('p');
          
          // console.log(exercise.images[0]);
          // img.src = exercise.images[0].image; 
          h2.textContent = exercise.name;

          exercise.description = exercise.description.substring(0, 500);
          var longDes = false;
          if (exercise.description.length > 500) {
              longDes = true;
          }
          if (longDes) {
              p.textContent = `${exercise.description}...`.split('/').join('');
          }
          else {
              p.textContent = `${exercise.description}`.split('/').join('');
          }
          p.textContent = p.textContent.replace(/<p>/g, '');
          // Filter out low effort description
          if (p.textContent.length > 10) {
              container.appendChild(card);
              card.appendChild(h2);
              card.appendChild(img);
              card.appendChild(p);
          }
      });
    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Error`;
      app.appendChild(errorMessage);
    }
  }
  request.send();
}

function searchExercise() {
  searchInputTxt = document.getElementById('wo-searchBar').value.trim();
  var request = new XMLHttpRequest();
  request.open('GET', 'https://wger.de/api/v2/exerciseinfo/?format=json&language=2&limit=100', true);
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      data.results.forEach(exercise => {
          const card = document.createElement('div');
          card.setAttribute('class', 'card');
          const img = document.createElement('img');
          const h2 = document.createElement('h2');
          const p = document.createElement('p');
          var isImage = false;
          if (exercise.images[0] != null) {
            console.log(exercise.images[0].image);
            isImage = true; 
            img.src = exercise.images[0].image; 
            img.style = "width: 300px; length: 300px; display: block; margin-left: auto; margin-right: auto;"; 
          }
          
          h2.textContent = exercise.name;

          exercise.description = exercise.description.substring(0, 500);
          var longDes = false;
          if (exercise.description.length > 500) {
              longDes = true;
          }
          if (longDes) {
              p.textContent = `${exercise.description}...`.split('/').join('');
          }
          else {
              p.textContent = `${exercise.description}`.split('/').join('');
          }
          p.textContent = p.textContent.replace(/<p>/g, '');
          // Filter out low effort description
          if (p.textContent.length > 10 && h2.textContent.toLocaleLowerCase().includes(searchInputTxt.toLowerCase())) {
              container.appendChild(card);
              card.appendChild(h2);
              if (isImage)
                card.appendChild(img);
              card.appendChild(p);
          }
      });
    } else {
      const errorMessage = document.createElement('marquee');
      errorMessage.textContent = `Error`;
      app.appendChild(errorMessage);
    }
  }
  request.send();
}

