export default class CardList {

  constructor(container, api, callback) {
    this.container = container;
    this.api = api;
    this.callback = callback;
  }

addCard(name, link) {
  this.container.appendChild(this.callback(name, link));
}

render(){
  this.api.getInitialCards().then((res)=>{
    res.forEach((item) =>{
      this.addCard(item.name, item.link);
    })
  })
  .catch((err)=>{
    console.log(err)
  })
}

}
