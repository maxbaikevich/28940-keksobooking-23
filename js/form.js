const form = document.querySelector('.ad-form');
const fildsetFormElement = form.querySelectorAll('.ad-form__element');
const fieldRoomNumber = form.querySelector('#room_number');
const fieldCapacity = form.querySelector('#capacity');
const fieldsetHeader = form.querySelector('.ad-form-header');
const fieldPrice = form.querySelector('#price');
const mapFiltersBlock = document.querySelector('.map__filters');
const mapFeatures = mapFiltersBlock.querySelector('.map__features');
const mapFilterElement = mapFiltersBlock.querySelectorAll('.map__filter');
const MAX_PRICE = 1000000;
let fieldCapacitySelecyed = Number(fieldRoomNumber.value);
let capacityNumber = Number(fieldCapacity.value);
let valuePrice = Number(fieldPrice.value);
function toggledAttrebuteDisabled(element) {
  if(element.hasAttribute('disabled')) {
    element.removeAttribute('disabled');
  }else {
    element.setAttribute('disabled', 'disabled');
  }
}
function disabledForm() {
  form.classList.add('ad-form--disabled');
  mapFiltersBlock.classList.add('ad-form--disabled');
  fildsetFormElement.forEach((el) => toggledAttrebuteDisabled(el));
  mapFilterElement.forEach((el) => toggledAttrebuteDisabled(el));
  toggledAttrebuteDisabled(fieldsetHeader);
  toggledAttrebuteDisabled(mapFeatures);
}
function activateForm() {
  form.classList.remove('ad-form--disabled');
  mapFiltersBlock.classList.remove('ad-form--disabled');
  fildsetFormElement.forEach((el) => toggledAttrebuteDisabled(el));
  mapFilterElement.forEach((el) => toggledAttrebuteDisabled(el));
  toggledAttrebuteDisabled(fieldsetHeader);
  toggledAttrebuteDisabled(mapFeatures);
}
fieldPrice.addEventListener('input', ()=> {
  valuePrice = Number(fieldPrice.value);
  if(valuePrice > MAX_PRICE) {
    fieldPrice.setCustomValidity(`Максимальная цена ${MAX_PRICE}`);
  }else {
    fieldPrice.setCustomValidity('');
  }
});
fieldRoomNumber.addEventListener('input',() => {
  fieldCapacitySelecyed = Number(fieldRoomNumber.value);
});
fieldCapacity.addEventListener('input',()=>{
  capacityNumber = Number(fieldCapacity.value);
  if(fieldCapacitySelecyed === 1 && capacityNumber !== 1) {
    fieldCapacity.setCustomValidity('Одна комната один гость!');
  }else if(fieldCapacitySelecyed === 2 && capacityNumber > 2) {
    fieldCapacity.setCustomValidity('Не более двух гостей');
  }else if(fieldCapacitySelecyed === 100 && capacityNumber > 0) {
    fieldCapacity.setCustomValidity('Не для гостей!');
  }else {
    fieldCapacity.setCustomValidity('');
  }
});
export {disabledForm, activateForm};
