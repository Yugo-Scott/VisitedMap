'use strict';

let form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const circles = document.querySelectorAll('.circle');
let isDragging = false;
let map, mapEvent;

if(navigator.geolocation)
navigator.geolocation.getCurrentPosition(function(position){
  console.log(position);
  const {latitude, longitude} = position.coords;  //オブジェクト分割代入
  console.log(latitude,longitude);
  const coords = [latitude,longitude];
  console.log('https://www.google.com/maps/@${latitude},${longitude},15z');
  map = L.map('map').setView(coords, 2);
  console.log(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// L.marker(coords).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();

map.on('click', function(e){
  mapEvent = e;
  form.classList.remove('hidden');
  // inputDistance.focus();
//   console.log(mapEvent);
//   const {lat, lng} = mapEvent.latlng;

//   const popup = new L.Popup({
//     autoClose: false,
//     closeOnClick: false,
//   }).setContent('My favorite place.');
  
//   L.marker([lat, lng])
//     .addTo(map)
//     .bindPopup(popup)
//     .openPopup();
// });
  });
});

circles.forEach((circle) => {
  circle.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateRating(e.target);
  });

  circle.addEventListener('mousemove', (e) => {
    if (isDragging) {
      updateRating(e.target);
    }
  });

  circle.addEventListener('mouseup', () => {
    isDragging = false;
  });
});

function updateRating(target) {
  const selectedValue = parseInt(target.dataset.value, 10);
  const circlesInCategory = target.parentElement.querySelectorAll('.circle');

  circlesInCategory.forEach((circle) => {
    const circleValue = parseInt(circle.dataset.value, 10);
    if (circleValue <= selectedValue) {
      circle.classList.add('selected');
    } else {
      circle.classList.remove('selected');
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // form = document.querySelector('.form');
form.addEventListener('submit', function(e){
  e.preventDefault();
  const ratingData = {};
  const categories = ['climate', 'nature', 'culture', 'food'];

  categories.forEach((category) => {
    const ratingContainer = document.querySelector(
      `.form .rating-container[data-category="${category}"]`
    );

    if (ratingContainer) {
      const selectedCircles = ratingContainer.querySelectorAll('.circle.selected');
      ratingData[category] = selectedCircles.length;
    } else {
      ratingData[category] = 0;
    }
  });

  localStorage.setItem('ratingData', JSON.stringify(ratingData));
  console.log(mapEvent);
  const {lat, lng} = mapEvent.latlng;

  const popup = new L.Popup({
    autoClose: false,
    closeOnClick: false,
  }).setContent('行ったことのある場所');
  
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(popup)
    .openPopup();
});
});







