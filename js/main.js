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


randomNumber(0,15);
randomNumberFloat(-2, -15, 1);
