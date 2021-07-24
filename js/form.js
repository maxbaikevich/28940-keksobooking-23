import {sendData} from './api.js';
import {successAlert, errorAlert} from './util.js';
const form = document.querySelector('.ad-form');
const fildsetFormElement = form.querySelectorAll('.ad-form__element');
const fieldRoomNumber = form.querySelector('#room_number');
const fieldCapacity = form.querySelector('#capacity');
const fieldsetHeader = form.querySelector('.ad-form-header');
const fieldPrice = form.querySelector('#price');
const typeLodging = form.querySelector('#type');
const selectTimein = form.querySelector('#timein');
const selectTimeout = form.querySelector('#timeout');
const mapFiltersBlock = document.querySelector('.map__filters');
const mapFeatures = mapFiltersBlock.querySelector('.map__features');
const mapFilterElement = mapFiltersBlock.querySelectorAll('.map__filter');
const MIN_PRICE_NIGHT_FLAT = 1000;
const MIN_PRICE_NIGHT_HOTEL = 3000;
const MIN_PRICE_NIGHT_HOUSE = 5000;
const MIN_PRICE_NIGHT_PALACE = 10000;
const MIN_PRICE_NIGHT_BUNGALOW = 0;
const MIN_PRICE_NIGHT = 'Минимальная цена за ночь';
let valuePrice = Number(fieldPrice.value);

const toggledAttrebuteDisabled = (element) =>{
  if(element.hasAttribute('disabled')) {
    element.removeAttribute('disabled');
  }else {
    element.setAttribute('disabled', 'disabled');
  }
};

const disabledForm = () => {
  form.classList.add('ad-form--disabled');
  mapFiltersBlock.classList.add('ad-form--disabled');
  fildsetFormElement.forEach((el) => toggledAttrebuteDisabled(el));
  mapFilterElement.forEach((el) => toggledAttrebuteDisabled(el));
  toggledAttrebuteDisabled(fieldsetHeader);
  toggledAttrebuteDisabled(mapFeatures);
};

const activateForm = () => {
  form.classList.remove('ad-form--disabled');
  mapFiltersBlock.classList.remove('ad-form--disabled');
  fildsetFormElement.forEach((el) => toggledAttrebuteDisabled(el));
  mapFilterElement.forEach((el) => toggledAttrebuteDisabled(el));
  toggledAttrebuteDisabled(fieldsetHeader);
  toggledAttrebuteDisabled(mapFeatures);
};

const disabledAllOptionsRoom = () => {
  const optionsRooms = Array.from(fieldCapacity.options);
  optionsRooms.forEach((el)=> {
    el.disabled = true;
  });
};

const vlidityFieldPrice = (el) => {
  let selectedLodging = {};
  if(el.selected === true) {
    selectedLodging = el;
    if(selectedLodging.value ==='flat' && valuePrice < MIN_PRICE_NIGHT_FLAT){
      fieldPrice.setCustomValidity(`${MIN_PRICE_NIGHT} ${MIN_PRICE_NIGHT_FLAT}`);
    }else if(selectedLodging.value ==='hotel' && valuePrice < MIN_PRICE_NIGHT_HOTEL) {
      fieldPrice.setCustomValidity(`${MIN_PRICE_NIGHT} ${MIN_PRICE_NIGHT_HOTEL}`);
    }else if(selectedLodging.value ==='house' && valuePrice < MIN_PRICE_NIGHT_HOUSE) {
      fieldPrice.setCustomValidity(`${MIN_PRICE_NIGHT} ${MIN_PRICE_NIGHT_HOUSE}`);
    }else if(selectedLodging.value ==='palace' && valuePrice < MIN_PRICE_NIGHT_PALACE) {
      fieldPrice.setCustomValidity(`${MIN_PRICE_NIGHT} ${MIN_PRICE_NIGHT_PALACE}`);
    }else if(selectedLodging.value==='bungalow' && valuePrice > MIN_PRICE_NIGHT_BUNGALOW) {
      fieldPrice.setCustomValidity(`${MIN_PRICE_NIGHT} ${MIN_PRICE_NIGHT_BUNGALOW}`);
    }else {
      fieldPrice.setCustomValidity('');
    }
  }
};

const priceChangePlaceholder = () => {
  const typeLodgingOptions = Array.from(typeLodging.options);
  typeLodgingOptions.forEach((el)=> {
    if( el.selected && el.value === 'flat') {
      fieldPrice.placeholder = MIN_PRICE_NIGHT_FLAT;
    }else if(el.selected && el.value === 'hotel') {
      fieldPrice.placeholder = MIN_PRICE_NIGHT_HOTEL;
    }else if(el.selected && el.value === 'house') {
      fieldPrice.placeholder = MIN_PRICE_NIGHT_HOUSE;
    }else if(el.selected && el.value === 'palace') {
      fieldPrice.placeholder = MIN_PRICE_NIGHT_PALACE;
    }else if(el.selected && el.value === 'bungalow') {
      fieldPrice.placeholder = MIN_PRICE_NIGHT_BUNGALOW;
    }
  });
};

const comparCapacity = (el, option) => {
  if(option === 100 && Number(el.value) === 0) {
    el.disabled = false;
    el.selected = true;
  }else if(option === 1 && Number(el.value) === 1) {
    el.disabled = false;
    el.selected = true;
  }else if(option === 2 && Number(el.value) >= 1 && Number(el.value) < 3) {
    el.disabled = false;
    el.selected = true;
  }else if(option === 3 && Number(el.value) >= 1){
    el.disabled = false;
    el.selected = true;
  }
};

const iniOptionsGroupRoomSelected = () => {
  const roomArr = Array.from(fieldRoomNumber.options);
  const capacityArr = Array.from(fieldCapacity.options);
  roomArr.forEach((el)=> {
    capacityArr.forEach((item)=> {
      if(el.selected && (( Number(el.value) === Number(item.value))|| (Number(el.value) === 100 && Number(item.value) === 0))) {
        item.disabled = false;
        item.selected = true;
      }
    });
  });
};

const synchronousTime = (verifiable, emit) => {
  const optVerifiable = Array.from(verifiable.options);
  const optEmit =  Array.from(emit.options);
  optEmit.forEach((el)=> {
    optVerifiable.forEach((item)=> {
      if(el.selected && el.value ===item.value) {
        item.selected = true;
      }
    });
  });
};

typeLodging.addEventListener('input', ()=> {
  priceChangePlaceholder();
  fieldPrice.value = '';
});

fieldPrice.addEventListener('input', ()=> {
  valuePrice = Number(fieldPrice.value);
  const typeLodgingOptions = Array.from(typeLodging.options);
  typeLodgingOptions.forEach((el)=>{
    vlidityFieldPrice(el);
  });
});

fieldRoomNumber.addEventListener('input',()=> {
  const fieldCapacitySelecyed = Number(fieldRoomNumber.value);
  disabledAllOptionsRoom();
  const optionsRooms = Array.from(fieldCapacity.options);
  optionsRooms.forEach((el)=> {
    comparCapacity(el, fieldCapacitySelecyed);
  });
});

selectTimein.addEventListener('input', ()=>{
  synchronousTime(selectTimeout, selectTimein);
});

selectTimeout.addEventListener('input', ()=> {
  synchronousTime(selectTimein, selectTimeout);
});
const clearForm = () => {
  form.reset();
  mapFiltersBlock.reset();
};
const setUserFormSubmit = (startMap) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => clearForm(),
      () => startMap(),
      () => successAlert(),
      () => errorAlert(),
      new FormData(evt.target),
    );
  });
};
export {disabledForm, activateForm, disabledAllOptionsRoom, iniOptionsGroupRoomSelected, priceChangePlaceholder, setUserFormSubmit, clearForm};
