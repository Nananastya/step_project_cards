import {renderItems}                                        from "./script.js"
import {getDataFromLS, setDataToLS}                         from "./utils.js"
import {loadAndSetLocalStorage}                             from "./script.js"
import {deleteF}                                            from "./script.js"
import {VisitTherapist, VisitDentist, VisitCardiologist}    from "./visit.js";

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
    this._inputs = this._modalDiv?.getElementsByTagName("input");
    this._modalSelect = document.querySelector('#modalSelectDoctor .modal-body select');
    this._goToSecondModal = document.querySelector('#modalSelectDoctor .btn-primary');
    this._modalBodyCard = document.querySelector('#modalCreateCard .modal-body');
    this._btnCreateCard = document.querySelector('#modalCreateCard .create-card');

    this._modalSelect?.addEventListener("change", () => {
      this.chooseDoctor();
      this.check();
    });

    this._goToSecondModal?.addEventListener("click", () => {
       this.createCard();
    })

    this._btnCreateCard?.addEventListener("click", () => {
      this.postGet();
      loadAndSetLocalStorage();
      renderItems();

      this._goToSecondModal.disabled = true;
      this._modalDiv.innerHTML = "";
    })
  }

  chooseDoctor(){
    this._goToSecondModal.disabled = true;
    this._modalDiv.innerHTML = "";
      this._modalDiv.innerHTML +=
        `<label>Ціль візиту:</label></br>
        <input placeholder="Ціль візиту..." class="aim"></input></br>
        <select class="status">
            <option value="none" selected disabled>Статус</option>
            <option value="open">Open</option>
            <option value="done">Done</option>
        </select></br>
        <label>Короткий опис візиту:</label></br>
        <input placeholder="Короткий опис візиту..." class="description"></input></br>
        <label>Терміновість:</label></br>
        <select class="urgency">
            <option value="none" selected disabled>Оберіть терміновість</option>
            <option value="ordinary">Звичайна</option>
            <option value="prior">Пріоритетна</option>
            <option value="urgent">Невідкладна</option>
        </select></br>
        <label>ПІБ:</label></br>
        <input placeholder="ПІБ" class="name"></input></br>`;

      if(this._modalSelect.value === "Therapist"){
        this._modalDiv.innerHTML +=
        `</br><label>Вік:</label></br>
        <input placeholder="Вік..." class="age"></input></br>`;
      }

      if (this._modalSelect.value === "Cardiologist"){
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

      if (this._modalSelect.value === "Dentist"){
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
    for(let el of this._inputs){
      el.addEventListener("input", () => {
        if([...this._inputs].every(this.isNotEmpty)){
          this._goToSecondModal.disabled = false;
          this.inputAimValue = this._modalDiv.querySelector(".aim").value;
          let selectStatusValueAttribute = this._modalDiv.querySelector(".status").value;
          this.selectStatusValue = this._modalDiv.querySelector(`option[value="${selectStatusValueAttribute}"]`).textContent;
          this.inputDescriptionValue = this._modalDiv.querySelector(".description").value;
          let selectUrgencyValueAttribute = this._modalDiv.querySelector(".urgency").value;
          this.selectUrgencyValue = this._modalDiv.querySelector(`option[value="${selectUrgencyValueAttribute}"]`).textContent;
          this.inputNameValue = this._modalDiv.querySelector(".name").value;
          if(this._modalSelect.value === "Therapist"){
            this.inputAgeValue = this._modalDiv.querySelector(".age").value;
          }
          else if(this._modalSelect.value === "Cardiologist"){
            this.inputAgeValue = this._modalDiv.querySelector(".age").value;
            this.inputPressureValue = this._modalDiv.querySelector(".pressure").value;
            this.inputIndexValue = this._modalDiv.querySelector(".index").value;
            this.inputIlnessesValue = this._modalDiv.querySelector(".ilnesses").value;
          }
          else if(this._modalSelect.value === "Dentist"){
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
      <p><span>ПІБ: </span><span>${this.inputNameValue}</span></p>`;
    if(this._modalSelect.value === "Therapist"){
      this._modalBodyCard.innerHTML += `<p><span>Вік: </span><span>${this.inputAgeValue}</span></p>`;
    }
    else if(this._modalSelect.value === "Cardiologist"){
      this._modalBodyCard.innerHTML +=
      `<p><span>Звичайний тиск: </span><span>${this.inputPressureValue}</span></p>
      <p><span>Індекс маси тіла: </span><span>${this.inputIndexValue}</span><p>
      <p><span>Перенесені захворювання серцево-судинної системи: </span><span>${this.inputIlnessesValue}</span></p>
      <p><span>Вік: </span><span>${this.inputAgeValue}</span></p>`;
    }
    else if(this._modalSelect.value === "Dentist"){
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

    if (this._modalSelect.value === "Cardiologist") {
      data.pressure = `${this.inputPressureValue}`
      data.weightIndex = `${this.inputIndexValue}`
      data.heartIllness = `${this.inputIlnessesValue}`
    }

    if (this._modalSelect.value === "Dentist") {
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
          renderItems();
        } else {
            throw new Error();
        }
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
                if(r.doctor === "Therapist"){
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
                            deleteF,
                            ""
                        ).render(container);
                }
                else if (r.doctor === "Cardiologist"){
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
                        ""

                    ).render(container);
                }
                else if (r.doctor === "Dentist"){
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
                        deleteF,
                        ""
                    ).render(container);
                }
            })
  }
  getCards(){
    fetch("https://ajax.test-danit.com/api/v2/cards", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getDataFromLS('token')}`
      },
    })
      .then(response => response.json())
      .then(response => {
        for(let i = 0; i < response.length; i++){
          this.getCardById(response[i].id);
        }
  })
  }
  deleteCard(id){
    fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getDataFromLS('token')}`
      },
    })
  }
}