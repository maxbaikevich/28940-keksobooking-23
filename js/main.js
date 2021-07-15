import {createElement} from './generating-similar-element.js';
import {genirationOrders} from './data.js';
import {disabledForm, activateForm,disabledAllOptionsRoom, iniOptionsGroupRoomSelected, priceСhangePlaceholder} from './form.js';
const mapCanvas = document.querySelector('#map-canvas');
const mapAddress = document.querySelector('#address');
const map = L.map(mapCanvas);
const data = genirationOrders(10);
disabledForm();
disabledAllOptionsRoom();
iniOptionsGroupRoomSelected();
priceСhangePlaceholder();

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const mainPinMarker =
  L.marker({
    lat: 35.658581,
    lng: 139.745438,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  });
const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

map
  // eslint-disable-next-line no-unused-vars
  .on('load', () =>  activateForm())
  .setView({
    lat: 35.658581,
    lng: 139.745438,
  }, 12);
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
