class CardList {

  constructor(container, api, callback) {
    this.container = container;
    this.api = api;
    this.callback = callback;
  }

addCard(name, link) {
  this.container.appendChild(this.callback(name, link));
}

/*REVIEW. Можно лучше. Лучше методы класса Api вызывать только в index.js и методы других классов вызывать в методах then, присоединённым к ним,
используя эти методы только для обработки ответа сервера. То есть, цепочки промисов обращения к серверу и обработки результатов полученных от него,
должны бы были быть только такого вида:
api.methodApi(параметры).then(обработка ответа силами методов других классов).catch(...), и  должны были бы находиться только в модуле index.js.
Для того, чтобы таким образом отрендерить массив карточек, в методе render надо ввести параметр cards для массива карточек и использовать для него
точно такой же код, как был у Вас в 8-м задании, а параметр api не вводить в конструктор класса CardList.

*/
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
