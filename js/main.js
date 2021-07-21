import {createElement} from './generating-similar-element.js';
import {showAlert} from './util.js';
import {disabledForm, activateForm,disabledAllOptionsRoom, iniOptionsGroupRoomSelected, priceСhangePlaceholder, setUserFormSubmit, clearForm} from './form.js';
import {getData} from './api.js';
const formReset = document.querySelector('.ad-form__reset');
const mapCanvas = document.querySelector('#map-canvas');
const mapAddress = document.querySelector('#address');
const map = L.map(mapCanvas);
const MAIN_PIN_MARKER_LAT = 35.658581;
const MAIN_PIN_MARKER_LNG = 139.745438;
const MAIN_PIN_ICON_SIZE = [52, 52];
const MAIN_PIN_ICON_ANCHOR = [26, 52];
const PIN_ICON_SIZE = [40, 40];
const PIN_ICON_ANCHOR = [20, 40];
const MAP_VIEW_LAT = 35.658581;
const MAP_VIEW_LNG = 139.745438;
const MAP_VIEW_SCALE = 10;
const markerGroup = L.layerGroup().addTo(map);
let timeId = null;
const currentFilter = {
  type: 'any',
  price: 'any',
  rooms: 'any',
  guests: 'any',
  features: [],
};
let savedData = [];
disabledForm();
disabledAllOptionsRoom();
iniOptionsGroupRoomSelected();
priceСhangePlaceholder();
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: MAIN_PIN_ICON_SIZE,
  iconAnchor: MAIN_PIN_ICON_ANCHOR,
});
const mainPinMarker =
  L.marker({
    lat: MAIN_PIN_MARKER_LAT,
    lng: MAIN_PIN_MARKER_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  });
const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: PIN_ICON_SIZE,
  iconAnchor: PIN_ICON_ANCHOR,
});

map
  // eslint-disable-next-line no-unused-vars
  .on('load', () =>  activateForm())
  .setView({
    lat: MAP_VIEW_LAT,
    lng: MAP_VIEW_LNG,
  }, MAP_VIEW_SCALE);
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
function startMap(){
  mainPinMarker.setLatLng({
    lat: MAIN_PIN_MARKER_LAT,
    lng: MAIN_PIN_MARKER_LNG,
  });
  map.setView({
    lat: MAP_VIEW_LAT,
    lng: MAP_VIEW_LNG,
  }, MAP_VIEW_SCALE);
  mapAddress.value = `${ mainPinMarker.getLatLng().lat.toFixed(4)} ${ mainPinMarker.getLatLng().lng.toFixed(4)}`;
}
function retranslite(flatType) {
  switch (flatType) {
    case 'Отель':
      return 'hotel';
    case 'Квартира':
      return 'flat';
    case 'Бунгало':
      return 'bungalow';
    case 'Дом':
      return 'house';
    case 'Дворец':
      return 'palace';
    default: return 'any';
  }
}
function setPoints(data) {
  markerGroup.clearLayers();
  data = data.slice(0, 10);
  data.forEach((el)=>{
    const {location} = el;
    const pin = L.marker({
      lat:location.lat,
      lng:location.lng,
    },
    {
      draggable: false,
      icon: pinIcon,
    });
    pin
      .addTo(markerGroup)
      .bindPopup(createElement(el));
  });
}

function selectFilter(event) {
  if(timeId) {
    return;
  }
  timeId = true;
  setTimeout(() => {
    const val = event.target.value;
    const filterType = event.target.id.split('-')[1];
    const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    if (features.indexOf(val) > -1) {
      const indexOfFeature = currentFilter.features.indexOf(val);
      if (indexOfFeature > -1) {
        currentFilter.features.splice(indexOfFeature, 1);
      } else {
        currentFilter.features.push(val);
      }
    } else {
      currentFilter[filterType] = val;
    }
    let output = savedData;
    if (currentFilter.rooms !== 'any') {
      output = output.filter((el) => el.offer.rooms === +currentFilter.rooms);
    }
    if (currentFilter.guests !== 'any') {
      output = output.filter((el) => el.offer.guests === +currentFilter.guests);
    }
    if (currentFilter.price !== 'any') {
      if (currentFilter.price === 'low') {
        output = output.filter((el) => el.offer.price < 10000);
      } else if (currentFilter.price === 'middle') {
        output = output.filter((el) => (el.offer.price >= 10000 && el.offer.price < 50000));
      } else if (currentFilter.price === 'high') {
        output = output.filter((el) => el.offer.price >= 50000);
      }
    }
    if (currentFilter.type !== 'any') {
      output.forEach((el) => el.offer.typeEng = retranslite(el.offer.type));
      output = output.filter((el) => el.offer.typeEng === currentFilter.type);
    }
    if (currentFilter.features.length) {
      currentFilter.features.forEach((feature) => {
        output = output.filter((el) => (el.offer.features && el.offer.features.indexOf(feature) > -1));
      });
    }
    output = output.slice(0, 10);
    setPoints(output);
    timeId = null;
  }, 500);
}
function init() {
  document.querySelector('#housing-type').addEventListener('change', selectFilter);

  document.querySelector('#housing-price').addEventListener('change', selectFilter);
  document.querySelector('#housing-rooms').addEventListener('change', selectFilter);
  document.querySelector('#housing-guests').addEventListener('change', selectFilter);
  document.querySelectorAll('.map__checkbox').forEach((el) => el.addEventListener('change', selectFilter));
}
init();


mainPinMarker.addTo(map);
startMap();

mainPinMarker.on('moveend', (event) => mapAddress.value = `${event.target.getLatLng().lat.toFixed(4)} ${event.target.getLatLng().lng.toFixed(4)}`);
formReset.addEventListener('click', (evt)=>{
  evt.preventDefault();
  clearForm();
  startMap();
  setPoints(savedData);
}),

getData(
  (adsData)=>{
    savedData = adsData;
    setPoints(adsData);
  },
  () => showAlert('Не удалось получить данные. Попробуйте ещё раз', 'red'),
);
setUserFormSubmit(startMap);
