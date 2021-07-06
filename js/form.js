const form = document.querySelector('.ad-form');
const fildsetFormElement = form.querySelectorAll('.ad-form__element');
const fieldsetHeader = form.querySelector('.ad-form-header');
const mapFiltersBlock = document.querySelector('.map__filters');
const mapFeatures = mapFiltersBlock.querySelector('.map__features');
const mapFilterElement = mapFiltersBlock.querySelectorAll('.map__filter');
function setAttributeDisabledElement(elem, name, value, type) {
  if(type === 'notAll') {
    elem.setAttribute(name, value);
  }else {
    elem.forEach((el)=>{
      el.setAttribute(name, value);
    });
  }
}
function setAttributeActivateElement(elem, attrName, type) {
  if(type === 'notAll') {
    elem.removeAttribute(attrName);
  }else {
    elem.forEach((el)=>{
      el.removeAttribute(attrName);
    });
  }
}
function disabledForm() {
  form.classList.add('ad-form--disabled');
  mapFiltersBlock.classList.add('ad-form--disabled');
  setAttributeDisabledElement(fildsetFormElement,'disabled', 'disabled', 'all');
  setAttributeDisabledElement(mapFilterElement,'disabled', 'disabled');
  setAttributeDisabledElement(fieldsetHeader,'disabled', 'disabled', 'notAll');
  setAttributeDisabledElement(mapFeatures,'disabled','disabled', 'notAll');
}
function activateForm() {
  form.classList.remove('ad-form--disabled');
  mapFiltersBlock.classList.remove('ad-form--disabled');
  setAttributeActivateElement(fildsetFormElement,'disabled', 'all');
  setAttributeActivateElement(mapFilterElement,'disabled', 'all');
  setAttributeActivateElement(fieldsetHeader,'disabled', 'notAll');
  setAttributeActivateElement(mapFeatures,'disabled', 'notAll');
}
export {disabledForm, activateForm};
