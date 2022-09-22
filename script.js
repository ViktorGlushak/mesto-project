const DOM = {
  closePopup: document.querySelector('.popup__close'),
  closePopupImage: document.querySelector('.popup-image__close'),
  editButton: document.querySelector('.profile__info-button-edit'),
  name: document.querySelector('.profile__info-name'),
  description: document.querySelector('.profile__info-description'),
  popup: document.querySelector('.popup'),
  popupImage: document.querySelector('.popup-image'),
  form: document.querySelector('.popup__main'),
  formName: document.querySelector('.form-name'),
  formDescription: document.querySelector('.form-description'),
  save: document.querySelector('.popup__save-button'),
  add: document.querySelector('.profile__add-button'),
  gallery: document.querySelector('.gallery'),
  galleryElement: document.querySelector('#gallery__element'),
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


getInitialCards().map(renderGallery);

function getInitialCards() {
  return initialCards;
}

function setFirstInitialCards(newElement) {
  if (newElement) return initialCards.unshift(newElement);
}

function createNewPicture(item) {
  const galleryTemplate = DOM.galleryElement.content;
  const galleryElement = galleryTemplate.querySelector('.gallery__element').cloneNode(true);

  galleryElement.querySelector('.gallery__picture').src = item.link;
  galleryElement.querySelector('.gallery__title').textContent = item.name;

  galleryElement.querySelector('.gallery__picture').addEventListener('click', showImage)
  galleryElement.querySelector('.gallery__like').addEventListener('click', likeCard)
  galleryElement.querySelector('.gallery__trash').addEventListener('click', deleteElement)

  return galleryElement

}

function renderGallery(item) {
  DOM.gallery.append(createNewPicture(item));
}

function closePopup(popup) {
  popup.classList.remove('popup_show');
  popup.classList.add('popup_hide');
}

function showPopup(popup) {
  popup.classList.remove('popup_hide');
  popup.classList.add('popup_show');
}

function openAddNewPlacePopup() {
  DOM.popup.querySelector('.popup__title').textContent = 'Новое место';
  DOM.form.querySelector('.popup__save-button').textContent = 'Создать';
  DOM.formName.value = '';
  DOM.formName.placeholder = 'Название';
  DOM.formDescription.value = '';
  DOM.formDescription.placeholder = 'Ссылка на картинку';
  showPopup(DOM.popup);
}

function openProfileInfoPopup() {
  DOM.popup.querySelector('.popup__title').textContent = 'Редактировать профиль';
  DOM.form.querySelector('.popup__save-button').textContent = 'Сохранить';
  DOM.formName.value = DOM.name.textContent;
  DOM.formDescription.value = DOM.description.textContent;
  showPopup(DOM.popup);
}

function saveInfo(e) {
  e.preventDefault();
  if (DOM.form.querySelector('.popup__save-button').textContent === 'Сохранить') {
    DOM.name.textContent = DOM.formName.value;
    DOM.description.textContent = DOM.formDescription.value;
  } else {
    if (DOM.formName.value && DOM.formDescription.value) {
      const newCard = {
        name: DOM.formName.value,
        link: DOM.formDescription.value
      }
      setFirstInitialCards(newCard)
      DOM.gallery.insertBefore(createNewPicture(newCard), DOM.gallery.firstChild);
    }
  }
  closePopup(DOM.popup);
}

function closePopupByCLickToOverlay(e) {
  if (e.target.className.indexOf('popup ') > -1) {
    closePopup(DOM.popup);
    return
  }
  if (e.target.className.indexOf('popup-image ') > -1) {
    closePopup(DOM.popupImage);
  }
}

function likeCard(e) {
  if (!e.target.style.backgroundImage) {
    e.target.style.backgroundImage = 'url(./images/heart-black.svg)';
  } else if (e.target.style.backgroundImage.indexOf('heart-black') !== -1) {
    e.target.style.backgroundImage = 'url(./images/heart-white.svg)';
  } else {
    e.target.style.backgroundImage = 'url(./images/heart-black.svg)';
  }
}

function deleteElement(e) {
  DOM.gallery.removeChild(e.target.parentElement);
}

function showImage(e) {
  DOM.popupImage.querySelector('.popup-image__picture').src = e.target.src;
  DOM.popupImage.querySelector('.popup-image__picture').onload = () => {
    if (e.target.naturalHeight > e.target.naturalWidth) {
      DOM.popupImage.querySelector('.popup-image__picture').style.height = '75vh';
      DOM.popupImage.querySelector('.popup-image__picture').style.width = '';
    }
    else {
      DOM.popupImage.querySelector('.popup-image__picture').style.height = '';
      DOM.popupImage.querySelector('.popup-image__picture').style.width = '75vh';
    }
    DOM.popupImage.querySelector('.popup-image__title').textContent = e.target.parentNode.children[2].children[0].innerText
    showPopup(DOM.popupImage);
  };
}

function addListeners() {
  DOM.closePopup.addEventListener('click', () => {
    closePopup(DOM.popup);
  });

  DOM.closePopupImage.addEventListener('click', () => {
    closePopup(DOM.popupImage);
  });

  DOM.editButton.addEventListener('click', openProfileInfoPopup);

  DOM.popup.addEventListener('click', closePopupByCLickToOverlay);

  DOM.popupImage.addEventListener('click', closePopupByCLickToOverlay);

  DOM.add.addEventListener('click', openAddNewPlacePopup);

  DOM.form.addEventListener('submit', saveInfo);

}

addListeners();

