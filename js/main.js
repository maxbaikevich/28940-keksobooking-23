import {createElement} from './generating-similar-element.js';
import {genirationOrders} from './data.js';
import {disabledForm, activateForm,disabledAllOptionsRoom, iniOptionsGroupRoomSelected, priceСhangePlaceholder} from './form.js';
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
const data = genirationOrders(10);
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

mainPinMarker.addTo(map);
mainPinMarker.on('moveend', (event) => mapAddress.value = `${event.target.getLatLng().lat.toFixed(4)} ${event.target.getLatLng().lng.toFixed(4)}`);

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
    .addTo(map)
    .bindPopup(createElement(el));
});
