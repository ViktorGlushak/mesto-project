let closeButton = document.querySelector('.profile-form__close');
let profileForm = document.querySelector('.profile-form');
let editButton = document.querySelector('.profile-info__button-edit');

closeButton.addEventListener('click', () => {
  profileForm.classList.remove('profile-form_show');
})

editButton.addEventListener('click', () => {
  profileForm.classList.add('profile-form_show');
})
