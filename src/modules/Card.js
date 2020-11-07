export default class Card {

  constructor(name, link){
    this.name = name;
    this.link = link;
  }

create() {

  const placeCard = document.createElement('div');
  placeCard.classList.add('place-card');

  const placeCardImage = document.createElement('div');
  placeCardImage.classList.add('place-card__image');
  placeCardImage.style.backgroundImage = `url(${this.link})`;

  const buttonDeleteIcon = document.createElement('button');
  buttonDeleteIcon.classList.add('place-card__delete-icon');

  const placeCardDescription = document.createElement('div');
  placeCardDescription.classList.add('place-card__description');

  const placeCardName = document.createElement('h3');
  placeCardName.classList.add('place-card__name');
  placeCardName.textContent = this.name;

  const buttonLikeIcon = document.createElement('button');
  buttonLikeIcon.classList.add('place-card__like-icon');

  placeCard.appendChild(placeCardImage);
  placeCard.appendChild(placeCardDescription);
  placeCardImage.appendChild(buttonDeleteIcon);
  placeCardDescription.appendChild(placeCardName);
  placeCardDescription.appendChild(buttonLikeIcon);

  this.placeCard = placeCard;
  this.buttonLikeIcon = placeCard.querySelector('.place-card__like-icon');
  this.buttonDeleteIcon = placeCard.querySelector('.place-card__delete-icon');
  this.setEventListeners();

  return placeCard;
}

remove = () => {
  this.placeCard.remove();
}

like (evnt) {
  evnt.target.classList.toggle('place-card__like-icon_liked');
}

setEventListeners() {
  this.buttonLikeIcon.addEventListener('click', this.like)
  this.buttonDeleteIcon.addEventListener('click', this.remove);
}

};

