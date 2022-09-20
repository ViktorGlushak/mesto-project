const closeButton = document.querySelector('.popup__close');
const profileForm = document.querySelector('.popup');
const editButton = document.querySelector('.profile__info-button-edit');

closeButton.addEventListener('click', () => {
  profileForm.classList.remove('popup_show');
})

editButton.addEventListener('click', () => {
  profileForm.classList.add('popup_show');
})
