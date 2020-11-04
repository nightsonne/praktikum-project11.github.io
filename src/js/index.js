(function(){

const placeList = document.querySelector('.places-list');

const userInfoButton = document.querySelector('.user-info__button');
const userInfoEditButton = document.querySelector('.user-info__edit-button');

const root = document.querySelector('.root');
const form = document.forms.new;
const formEdit = document.forms.edit;

const nameInput =  formEdit.elements.name;
const aboutInput = formEdit.elements.about;

const popupNewCard = document.querySelector('.popup_new-card');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupOpenImage = document.querySelector('.popup_open-image');

//создадим экземпляр класса Api
const api = new Api('https://nomoreparties.co/cohort12/cards');

// создадим функцию-коллбек для передачи в класс CardList
const newCard = (name, link) => {
  const card = new Card(name, link);
  return card.create();
}

// создадим экземпляр класса CardList для отрисовки карточек, полученных с сервера
const cardList = new CardList(placeList, api, newCard);

// и добавим карточки на страницу
cardList.render();

//создадим еще один экземпляр класса Api
const apiUserData = new Api('https://nomoreparties.co/cohort12/users/me');

// создадим экземпляр класса UserInfo
const userInfo = new UserInfo(document.querySelector('.user-info__name'), document.querySelector('.user-info__job'),document.querySelector('.user-info__photo'));

// получим с сервера данные пользователя и выведем их в соответствующие DOM-элементы
apiUserData.getUserData()
 .then((res) =>{
    userInfo.updateUserInfoServer(res.name,res.about,res.avatar); //*******************************************************************
      console.log(res);
  })
  .catch(err => console.log(err));

// создадим экземпляр класса FormValidator для валидации формы добавления новой карточки
const addNewCardForm = new FormValidator(form);
addNewCardForm.setEventListeners();
addNewCardForm.resetFormErrors();

// создадим экземпляр класса FormValidator для валидации формы редактирования информации пользователя
const addNewEditData = new FormValidator(formEdit);
addNewEditData.setEventListeners();
addNewEditData.resetFormErrors();

// создадим экземпляр класса Popup для поп-апа добавления карточки
const popupNewCardForm = new Popup(popupNewCard, "popup_is-opened");
// открываем поп-ап добавления карточки по клику на кнопку +
userInfoButton.addEventListener("click", () => {
  form.reset();
  form.querySelector('button').setAttribute('disabled', true);
  form.querySelector('button').classList.remove('popup__button_valid');
  popupNewCardForm.open();
  addNewCardForm.resetFormErrors();
});

// создадим экземпляр класса Popup для поп-апа редактирования информации пользователя
const popupEditProfileForm = new Popup(popupEditProfile, "popup_is-opened");
// открываем поп-ап редактирования информации пользователя по клику на кнопку Edit
userInfoEditButton.addEventListener("click", () => {
  nameInput.value = document.querySelector('.user-info__name').textContent,
  aboutInput.value = document.querySelector('.user-info__job').textContent,
  formEdit.querySelector('button').classList.add('popup__button_valid');
  formEdit.querySelector('button').removeAttribute('disabled', true);
  addNewEditData.resetFormErrors();
  popupEditProfileForm.open();
});

// создадим экземпляр класса Popup для поп-апа большой картинки
const popupOpenBigImage = new Popup(popupOpenImage, "popup_is-opened");
// открываем поп-ап по клику на соответствующую картинку
root.addEventListener('click', (event) => {
  if (event.target.classList.contains('place-card__image')) {
    const bigImage = document.querySelector('.popup__content_open-image');
	  bigImage.style.backgroundImage = event.target.style.backgroundImage;
    popupOpenBigImage.open();
  }
});

// создадим функцию добавления новой карточки на страницу
const addUserCard = (event) => {
  event.preventDefault();
  const name = form.elements.name;
  const link = form.elements.link;
  cardList.addCard(name.value, link.value);
};

form.addEventListener("submit", (event) => {
	addUserCard(event);
	form.reset();
  popupNewCardForm.close();
  addNewEditData.resetFormErrors()
});

formEdit.addEventListener('submit', (event) => {
  event.preventDefault();
  // отправим на сервер данные из инпутов формы и их в соответствующие DOM-элементы
  apiUserData.patchUserData(nameInput.value,aboutInput.value)
  .then((res) =>{
      userInfo.setUserInfo(res.name,res.about);
      //console.log(res);
      popupEditProfileForm.close();
    })
      .catch(err => console.log(err));

  addNewEditData.resetFormErrors()
});

})();


/*
REVIEW. Резюме.

Очень хороший проект. Взаимодействие с сервером происходит, информация на сервере сохраняется и на странице меняется.

Есть одна ошибка.

Что надо исправить.

1. Произвести закрытие формы профиля при сабмите нужно в методе then обработки ответа сервера (подробный комментарий в
слушателе сабмита формы профиля). +++++++++++++++++++++++++++++


Что надо лучше.

1. Чтобы во всём проекте была одинаковая логика и методы классов выполняли свои единственные задачи (методы класса Api делали запрос к серверу,
методы других классов только обрабатывали этот ответ) метод api.getInitialCards() нужно вызывать в index.js вне метода render класса CardList,
аналогично тому, как Вы это делаете для других методов класса Api (подробный комментарий в файле класса CardList).

____________________________________________________________________________________________________________________________________________________

REVIEW2. Резюме2.

Критическое замечание устранено.

Проект принимается.

Желаю дальнейшей интересной и успешной учёбы и удачи!


*/