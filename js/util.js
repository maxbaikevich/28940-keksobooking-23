const ALERT_SHOW_TIME = 9000;
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const TITLEFLAT = 'квартира';
const TITLECITY = 'Токио';
const TITLEDESCRIPTION = [
  'Грязная',
  'Чистая',
  'Просторная',
  'Большая',
  'Ненавящивая',
  'Душная',
  'Везучая',
  'Модная',
  'Молодая',
  'Откровенная',
];
const TITLELOCATION=[
  'Где-то в',
  'На окраине',
  'В центре',
  'За углом',
  'Над',
  'Под',
];
const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECKOUT=['12:00', '13:00','14:00'];
const CHECKIN=['12:00', '13:00','14:00'];

function randomNumber(min, max) {
  if(max < 0 || min >= max) {
    return;
  }
  if(min < 0 ) {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomNumberFloat(min, max, quantity) {
  if(max < 0 || min >= max) {
    return;
  }
  if(min < 0) {
    min = 0;
  }
  const number = Math.random() * (max - min + 1) + min;
  return number.toFixed(quantity);
}

function getAvatarFoto(num) {
  return num < 10 ? `img/avatars/user0${num}.png` : `img/avatars/user${num}.png`;
}

function getRandomArrayElement(elements) {
  return elements[ randomNumber(0, elements.length - 1)];
}

function getRandomArr(type) {
  const randomLength = randomNumber(1, type.length -1);
  const arr = [];
  for(let index = 0; index  <= randomLength; index ++) {
    if(!arr.includes(type[index])) {
      arr.push(type[index]);
    }
  }
  return arr;
}

function getOrder(num) {
  return {
    author:{
      avatar:getAvatarFoto(num),
    },
    location:{
      lat: parseFloat(randomNumberFloat(35.65000, 35.70000, 5)),
      lng: parseFloat(randomNumberFloat(139.70000, 139.80000, 5)),
    },
    offer:{
      title: `${getRandomArrayElement(TITLEDESCRIPTION)} ${TITLEFLAT}. ${getRandomArrayElement(TITLELOCATION)} ${TITLECITY}`,
      address:`${String(randomNumberFloat(35.65000, 35.70000, 5))}, ${String(randomNumberFloat(35.65000, 35.70000, 5))}`,
      price: randomNumber(1000, 100000),
      type: getRandomArrayElement(TYPE),
      rooms: randomNumber(1, 5),
      guests:randomNumber(1, 5),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: getRandomArr(FEATURES),
      description:getRandomArrayElement(TITLEDESCRIPTION),
      photos:getRandomArr(PHOTOS),
    },
  };
}
function showAlert(message, color){
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100000;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = color;
  alertContainer.textContent = message;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}
export {getOrder,showAlert};
