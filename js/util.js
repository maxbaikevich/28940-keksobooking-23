const ALERT_SHOW_TIME = 500;
const ESC_KEY_CODE = 27;
const keyDown = (keyCode, element) => {
  window.onkeydown = ( (event) =>{
    if ( event.keyCode === keyCode) {
      element.remove();
    }
  });
};
const showAlert = (message, color) =>{
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100000';
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = color;
  alertContainer.textContent = message;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
const errorAlert = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);
  document.body.append(errorElement);
  const errorBtn = errorElement.querySelector('.error__button');
  errorBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    window.location.reload();
  });
  keyDown(ESC_KEY_CODE, errorElement);
  document.onclick = (() => {
    errorElement.remove();
  });
};
const successAlert = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);
  document.body.append(successElement);
  keyDown(ESC_KEY_CODE, successElement);
  document.onclick = (() => {
    successElement.remove();
  });
};
export { showAlert, errorAlert, successAlert};
