const form = document.querySelector('.ad-form');
const fildsetFormElement = form.querySelectorAll('.ad-form__element');
const fieldsetHeader = form.querySelector('.ad-form-header');
const mapFiltersBlock = document.querySelector('.map__filters');
const mapFeatures = mapFiltersBlock.querySelector('.map__features');
const mapFilterElement = mapFiltersBlock.querySelectorAll('.map__filter');
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
export {disabledForm, activateForm};
