/*REVIEW. Можно лучше. Лучше токен передавать в параметры класса, чтобы класс был от него независим и не дублировался код. */
class Api {
  constructor(url) {
    this.url = url;
}

getInitialCards(){
    return fetch(this.url, {
      method: 'GET',
      headers: {
        authorization:'b3a7a0fc-5b2c-4dde-bcf2-082a54100210'
      }
    })
    .then ((res) => {
      if(res.ok) {
        return res.json()
      }
    })
  }
getUserData(){
    return fetch(this.url, {
      method: 'GET',
      headers: {
        authorization:'b3a7a0fc-5b2c-4dde-bcf2-082a54100210'
      }
    })
    .then ((res) => {
      if(res.ok) {
        return res.json()
      }
    })
  }
patchUserData(name,about){
    return fetch(this.url,  {
      method: 'PATCH',
      headers: {
          authorization:'b3a7a0fc-5b2c-4dde-bcf2-082a54100210','Content-Type': 'application/json'
        },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
    });

}

}

/*Токен: b3a7a0fc-5b2c-4dde-bcf2-082a54100210
Идентификатор группы: cohort12 */