function randomNumber(min, max) {
  if(0>min || min>=max) {
    return;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomNumberFloat(min, max, quantity) {
  if(0>min || min>=max) {
    return;
  }
  const number = Math.random() * (max - min + 1) + min;
  return number.toFixed(quantity);
}


randomNumber(3,15);
randomNumberFloat(-2, -15, 1);
