export default class Popup {
	constructor(popupName, addClassName) {
		this.popupName = popupName;
    this.addClassName = addClassName;
    this.popupName.querySelector('.popup__close').addEventListener("click", () => this.close());
	}

	open() {
		this.popupName.classList.add(this.addClassName);
	}

	close() {
		this.popupName.classList.remove(this.addClassName);
	}
}
