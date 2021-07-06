import {similarFragment} from './generating-similar-element.js';
import {disabledForm, activateForm} from './form.js';
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(similarFragment);
disabledForm();
activateForm();
