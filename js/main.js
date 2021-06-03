function randomNumber(min, max) {
  if(min >= max) {
    return;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomNumberFloat(min, max, quantity) {
  if(min >= max) {
    return;
  }
  const number = Math.random() * (max - min + 1) + min;
  return number.toFixed(quantity);
}


randomNumber(0, 10);
randomNumberFloat(0, 10, 1);
