import {renderItems}                                        from "./script.js"
import {getDataFromLS, setDataToLS}                         from "./utils.js"
import {loadAndSetLocalStorage, deleteF, confirmL}          from "./script.js"
import {VisitTherapist, VisitDentist, VisitCardiologist}    from "./visit.js";

export class LoginModal {
  constructor(confirmL) {
      this._modalElement = document.createElement("div");
      this._backgroundContainer = document.createElement("div");
      this._mainContainer = document.createElement("div");
      this._contentContainer = document.createElement("div");
      this._buttonContainer = document.createElement("div");
      this._closeButton = document.createElement("div");
      this.form = document.createElement("form");
      this.inputLogin = document.createElement("input");
      this.inputLogin.type = 'login'
      this.inputPassWord = document.createElement("input");
      this.inputPassWord.type = 'password'
      this.confirmBttn = document.createElement("button");
      this.noInfoMessage = document.createElement("p");
      this.confirmL = confirmL;
  }
  closeModal() {
      this._modalElement.remove();
  }
  createElements() {
      this._modalElement.classList.add("my-modal");
      this._modalElement.append(this._backgroundContainer);
      this._backgroundContainer.classList.add("modal__background");
      this._backgroundContainer.addEventListener("click", this.closeModal.bind(this));

      this._modalElement.append(this._mainContainer);
      this._mainContainer.classList.add("modal__main-container");
      this._mainContainer.append(this._contentContainer);
      this._mainContainer.append(this._buttonContainer);
      this._mainContainer.append(this._closeButton);
      this._contentContainer.classList.add("modal__content-wrapper");
      this._buttonContainer.classList.add("modal__button-wrapper");
      this._closeButton.classList.add("modal__close");
      this._closeButton.addEventListener("click", this.closeModal.bind(this));

      this.form.insertAdjacentHTML("beforeend", "<label>Логін</label>");
      this.form.append(this.inputLogin);
      this.form.insertAdjacentHTML("beforeend", "<label>Пароль</label>");
      this.form.append(this.inputPassWord);
      this._contentContainer.append(this.form);
      this._buttonContainer.append(this.confirmBttn);

      this.confirmBttn.innerText = "Підтвердити";
      this.confirmBttn.classList.add("modal__confirm-btn");
      this.confirmBttn.addEventListener("click", () => {
          this.noInfoMessage.innerText = "";
          if (this.inputLogin.value === "" || this.inputPassWord.value === "") {
              this.form.append(this.noInfoMessage);
              this.noInfoMessage.innerText = "Усі поля мають бути заповнені";
          } else {
              confirmL(this.inputLogin.value, this.inputPassWord.value, this.closeModal.bind(this));
          }
      });
  }
  render(container = document.body) {
      this.createElements();
      container.append(this._modalElement);
  }

}




export class Modal {
  constructor() {
    this.inputAimValue = "";
    this.selectStatusValue = "";
    this.inputDescriptionValue = "";
    this.selectUrgencyValue = "";
    this.inputNameValue = "";
    this.inputAgeValue = "";
    this.inputPressureValue = "";
    this.inputIndexValue = "";
    this.inputIlnessesValue = "";
    this.inputLastVisitValue = "";

    this._modalDiv = document.querySelector('#modalSelectDoctor .modal-body div');
    this._inputs = []
    this._selects = []
    this._modalSelect = document.querySelector('#modalSelectDoctor .modal-body select');
    this._goToSecondModal = document.querySelector('#modalSelectDoctor .btn-primary');
    this._modalBodyCard = document.querySelector('#modalCreateCard .modal-body');
    this._btnCreateCard = document.querySelector('#modalCreateCard .create-card');

    this._modalSelect?.addEventListener("change", () => {
      this.chooseDoctor();

      this._inputs = [ ...this._modalDiv?.getElementsByTagName("input") ];
      this._selects = [...this._modalDiv.querySelectorAll('select')]

      this.check();
    });

    document.querySelector('#modalSelectDoctor .modal-header .btn-close').addEventListener("click", () => {
      this._modalDiv.innerHTML = "";
    });

    this._goToSecondModal?.addEventListener("click", () => {
       this.createCard();
    })

    this.addCard = this.addCard.bind(this)

    this._btnCreateCard?.addEventListener("click", this.addCard)
  }

  addCard = () => {
    this.postGet();
    // loadAndSetLocalStorage();

    // this._btnCreateCard.removeEventListener('click', this.addCard)

    this._goToSecondModal.disabled = true;
    this._modalDiv.innerHTML = "";
  }

  chooseDoctor(){
    this._goToSecondModal.disabled = true;
    this._modalDiv.innerHTML = "";
      this._modalDiv.innerHTML +=
        `<label>Ціль візиту:</label></br>
        <input placeholder="Ціль візиту..." class="aim"></input></br>
        <select class="status">
            <option value="" selected disabled>Статус</option>
            <option value="Open">Open</option>
            <option value="Done">Done</option>
        </select></br>
        <label>Короткий опис візиту:</label></br>
        <input placeholder="Короткий опис візиту..." class="description"></input></br>
        <label>Терміновість:</label></br>
        <select class="urgency">
            <option value="" selected disabled>Оберіть терміновість</option>
            <option value="Висока">Висока</option>
            <option value="Нормальна">Нормальна</option>
            <option value="Низька">Низька</option>
        </select></br>
        <label>Ім'я:</label></br>
        <input placeholder="Ім'я" class="name"></input></br>`

      if (this._modalSelect.value === "Кардіолог"){
        this._modalDiv.innerHTML +=
        `<label>Звичайний тиск:</label></br>
        <input placeholder="Звичайний тиск..." class="pressure"></input></br>
        <label>Індекс маси тіла:</label></br>
        <input placeholder="Індекс маси тіла..." class="index"></input></br>
        <label>Перенесені захворювання серцево-судинної системи:</label></br>
        <input placeholder="Перенесені захворювання серцево-судинної системи..." class="ilnesses"></input></br>
        <label>Вік:</label></br>
        <input placeholder="Вік..." class="age"></input></br>`;
      }

      if (this._modalSelect.value === "Стоматолог"){
        this._modalDiv.innerHTML +=
          `<label>Дата останнього візиту:</label></br>
          <input placeholder="Дата останнього візиту..." class="last-visit"></input></br>`;
      }

  }

  isNotEmpty(element){
    if (element.value.trim() === '') {
      return false;
    }

    return true;
  }

  check(){
    for(let el of [ ...this._inputs, ...this._selects]){
      const isInput = el.tagName === 'INPUT'

      el.addEventListener(isInput ? "input" : 'change', () => {
        if([...this._inputs].every(this.isNotEmpty)){
          this._goToSecondModal.disabled = false;
          this.inputAimValue = this._modalDiv.querySelector(".aim").value;
          let selectStatusValueAttribute = this._modalDiv.querySelector(".status").value;
          this.selectStatusValue = this._modalDiv.querySelector(`option[value="${selectStatusValueAttribute}"]`).value;
          this.inputDescriptionValue = this._modalDiv.querySelector(".description").value;
          let selectUrgencyValueAttribute = this._modalDiv.querySelector(".urgency").value;
          this.selectUrgencyValue = this._modalDiv.querySelector(`option[value="${selectUrgencyValueAttribute}"]`).value;
          this.inputNameValue = this._modalDiv.querySelector(".name").value;

          if(this._modalSelect.value === "Кардіолог"){
            this.inputAgeValue = this._modalDiv.querySelector(".age").value;
            this.inputPressureValue = this._modalDiv.querySelector(".pressure").value;
            this.inputIndexValue = this._modalDiv.querySelector(".index").value;
            this.inputIlnessesValue = this._modalDiv.querySelector(".ilnesses").value;
          }
          else if(this._modalSelect.value === "Стоматолог"){
            this.inputLastVisitValue = this._modalDiv.querySelector(".last-visit").value;
          }
        }
        else{
          this._goToSecondModal.disabled = true;
        }
      })
    }
  }
  createCard(){
    this._modalBodyCard.innerHTML = "";
    this._modalBodyCard.innerHTML +=
      `<p><span>Ціль візиту: </span><span>${this.inputAimValue}</span></p>
      <p><span>Короткий опис візиту: </span><span>${this.inputDescriptionValue}</span><p>
      <p><span>Статус: </span><span>${this.selectStatusValue}</span></p>
      <p><span>Терміновість: </span><span>${this.selectUrgencyValue}</span></p>
      <p><span>Ім'я: </span><span>${this.inputNameValue}</span></p>`;

    if(this._modalSelect.value === "Кардіолог"){
      this._modalBodyCard.innerHTML +=
      `<p><span>Звичайний тиск: </span><span>${this.inputPressureValue}</span></p>
      <p><span>Індекс маси тіла: </span><span>${this.inputIndexValue}</span><p>
      <p><span>Перенесені захворювання серцево-судинної системи: </span><span>${this.inputIlnessesValue}</span></p>
      <p><span>Вік: </span><span>${this.inputAgeValue}</span></p>`;
    }
    else if(this._modalSelect.value === "Стоматолог"){
      this._modalBodyCard.innerHTML += `<p><span>Дата останнього візиту: </span><span>${this.inputLastVisitValue}</span></p>`;
    }
  }

  postGet(){
    const data = {
        doctor        : this._modalSelect.value,
        purpose       : `${this.inputAimValue}`,
        description   : `${this.inputDescriptionValue}`,
        status        : `${this.selectStatusValue}`,
        urgency       : `${this.selectUrgencyValue}`,
        fullName      : `${this.inputNameValue}`,
        age           : `${this.inputAgeValue}`,
    }

    if (this._modalSelect.value === "Кардіолог") {
      data.pressure = `${this.inputPressureValue}`
      data.weightIndex = `${this.inputIndexValue}`
      data.heartIllness = `${this.inputIlnessesValue}`
      data.age = `${this.inputAgeValue}`
    }

    if (this._modalSelect.value === "Стоматолог") {
      data.lastDateVisit = `${this.inputLastVisitValue}`

      delete data.age
    }

    fetch("https://ajax.test-danit.com/api/v2/cards", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getDataFromLS('token')}`
      },
      body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then((response) => {
        if (response.id) {
          const currentArray = [ ...getDataFromLS("array") || [], response];

          setDataToLS("array", currentArray)
          loadAndSetLocalStorage()
        } else {
            throw new Error();
        }
    })
    .catch(error => {
      console.log(error)
    })
  }
  getCardById(id){
    fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getDataFromLS('token')}`
        },
        }).then(response => response.json())
            .then(r => {
                if(r.doctor === "Терапевт"){
                    new VisitTherapist(
                            r.age,
                            r.description,
                            r.doctor,
                            r.fullName,
                            r.urgency,
                            r.purpose,
                            r.status,
                            "",
                            r.id,
                            "",
                            "",
                            "",
                            "",
                            deleteF
                        ).render(document.querySelector(".cardContainer"));
                }
                else if (r.doctor === "Кардіолог"){
                    new VisitCardiologist(
                        r.age,
                        r.description,
                        r.doctor,
                        r.fullName,
                        r.urgency,
                        r.purpose,
                        r.status,
                        r.heartIllness,
                        r.id,
                        r.pressure,
                        r.weightIndex,
                        "",
                        "",
                        deleteF,

                    ).render(document.querySelector(".cardContainer"));
                }
                else if (r.doctor === "Стоматолог"){
                    new VisitDentist(
                        r.age,
                        r.description,
                        r.doctor,
                        r.fullName,
                        r.urgency,
                        r.purpose,
                        r.status,
                        "",
                        r.id,
                        "",
                        "",
                        r.lastDateVisit,
                        "",
                        deleteF
                    ).render(document.querySelector(".cardContainer"));
                }
            })
  }
}