import {similarFragment} from './generating-similar-element.js';
import {disabledForm, activateForm,disabledAllOptionsRoom, iniOptionsGroupRoomSelected, priceСhangePlaceholder} from './form.js';
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(similarFragment);
disabledForm();
activateForm();
disabledAllOptionsRoom();
iniOptionsGroupRoomSelected();
priceСhangePlaceholder();
