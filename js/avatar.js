const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const fileChooser = document.querySelector('#avatar');
const preview = document.querySelector('.ad-form-header__preview > img');
fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    const matchesLineEnd = fileName.endsWith(it);
    return matchesLineEnd;
  });
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});
