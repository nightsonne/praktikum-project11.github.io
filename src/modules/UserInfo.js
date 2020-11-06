export default class UserInfo {
  constructor(nameContainer, aboutContainer, avatarContainer) {
    this.nameContainer = nameContainer;
    this.aboutContainer = aboutContainer;
    this.avatarContainer = avatarContainer;
  }
  updateUserInfo(userName, userAbout) {
    this.nameContainer.textContent = userName.value;
    this.aboutContainer.textContent = userAbout.value;
  }

	updateUserInfoServer (name, about, avatar) { 
    this.nameContainer.textContent = name;
		this.aboutContainer.textContent = about;
    this.avatarContainer.style.backgroundImage = `url(${avatar})`;
  }

  setUserInfo(name, about) {
    this.nameContainer.textContent = name;
    this.aboutContainer.textContent = about;
  }
}
