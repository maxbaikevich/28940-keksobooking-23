const GET_DATA_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const SEND_DATA_URL = 'https://23.javascript.pages.academy/keksobooking';
const getData = (onSuccess, onFail) => {
  fetch(GET_DATA_URL)
    .then((response) => response.json())
    .then((adsData) => {
      onSuccess(adsData);
    })
    .catch(()=>{
      onFail();
    });
};
function sendData (onSuccess, startMap, onLuck, onFail, body){
  fetch(
    SEND_DATA_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        startMap();
        onLuck();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
}
export {getData, sendData};
