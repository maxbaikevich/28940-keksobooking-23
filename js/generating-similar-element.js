const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarCardPhoto = (similarCardElement, img) =>{
  const element = similarCardElement.querySelector('.popup__photos');
  if(img === undefined || !img.length) {
    element.remove();
    return;
  }
  element.querySelector('img').remove();
  img.forEach((photos)=>{
    const photoList = `<img src="${photos}" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>`;
    element.innerHTML += photoList;
  });
};
const displayFeatures = (modifaer, similarCardElement) => {
  const featuresContainer = similarCardElement.querySelector('.popup__features');
  const modifaers = modifaer.map((features)=> `popup__feature--${features}`);
  const featuresElements = similarCardElement.querySelectorAll('.popup__feature');
  const fragment = document.createDocumentFragment();
  featuresElements.forEach((item)=>item.remove());
  modifaers.forEach((el)=> {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature',`${el}`);
    fragment.appendChild(featureElement);
  });
  featuresContainer.appendChild(fragment);
};

const createElement = (el)  =>{
  switch (el.offer.type) {
    case 'hotel':
      el.offer.type = 'Отель';
      break;
    case 'flat':
      el.offer.type = 'Квартира';
      break;
    case 'bungalow':
      el.offer.type = 'Бунгало';
      break;
    case 'house':
      el.offer.type = 'Дом';
      break;
    case 'palace':
      el.offer.type = 'Дворец';
      break;
    default: 'Пространство';
  }
  const similarCardElement = cardTemplate.cloneNode(true);
  el.offer.title ? similarCardElement.querySelector('.popup__title').textContent = el.offer.title : similarCardElement.querySelector('.popup__title').remove;
  el.offer.address ? similarCardElement.querySelector('.popup__text--address').textContent = el.offer.address :  similarCardElement.querySelector('.popup__text--address').remove;
  el.offer.price ? similarCardElement.querySelector('.popup__text--price').textContent = `${el.offer.price}  ₽/ночь` : similarCardElement.querySelector('.popup__text--price').remove;
  el.offer.type ? similarCardElement.querySelector('.popup__type').textContent = el.offer.type : similarCardElement.querySelector('.popup__type').remove;
  similarCardElement.querySelector('.popup__text--capacity').textContent = `${el.offer.rooms} комнаты для ${el.offer.guests} гостей`;
  similarCardElement.querySelector('.popup__text--time').textContent = `Заезд после ${el.offer.checkin} выезд до ${el.offer.checkout}`;
  el.offer.description ? similarCardElement.querySelector('.popup__description').textContent = el.offer.description : similarCardElement.querySelector('.popup__description').remove;
  el.author.avatar ? similarCardElement.querySelector('.popup__avatar').src = el.author.avatar : similarCardElement.querySelector('.popup__avatar').remove;
  if(el.offer.features) {
    displayFeatures(el.offer.features, similarCardElement);
  }
  similarCardPhoto(similarCardElement, el.offer.photos);
  return similarCardElement;
};
export {createElement};
