import {getDataFromLS, setDataToLS}                         from "./utils.js"
import {VisitTherapist, VisitDentist, VisitCardiologist}    from "./visit.js";
import {Modal} from "./modal.js"
import {renderItems}                                        from "./script.js"
import {loadAndSetLocalStorage}                             from "./script.js"
import {deleteF}                                            from "./script.js"

export class Change {
    constructor(cardEl = "") {
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
        this._cardId = "";

        this._modalDiv = document.querySelector('#modalChangeCard .modal-body div');
        this._inputs = this._modalDiv?.getElementsByTagName("input");
        this._modalSelect = document.querySelector('#modalChangeCard .modal-body select');
        this._goToSecondModal = document.querySelector('#modalChangeCard .btn-primary');
        this._modalBodyCard = document.querySelector('#modalCreateCard2 .modal-body');
        this._btnChangeCard = document.querySelector('#modalCreateCard2 .change-card');
        this._root = document.querySelector('#root');
        this._card = cardEl;
        this.updateCard = this.updateCard.bind(this)


        this._modalSelect?.addEventListener("change", () => {
            this.chooseDoctor();
            this.check();
        });
        this._goToSecondModal?.addEventListener("click", () => {
            this.checkAtOnce();
            this.recreateCard(this._modalSelect.value);
        })

        this._btnChangeCard?.addEventListener("click", this.updateCard)
    }

    updateCard () {
      this.pullGet(this._cardId);
      this._btnChangeCard.removeEventListener('click', this.updateCard)

      this._goToSecondModal.disabled = true;
      this._modalDiv.innerHTML = "";

    }

    getDoctorById(id){
        this._cardId = id;
        fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getDataFromLS('token')}`
                },
                }).then(response => response.json())
                .then(r => {
                  this.selectDoctor(r.doctor);
                  if(r.doctor === "Терапевт"){
                    this.cardData(r.doctor, r.purpose, r.status, r.description, r.urgency, r.fullName /* r.age */);
                    this.check();
                  }
                  else if(r.doctor === "Кардіолог"){
                    this.cardData(r.doctor, r.purpose, r.status, r.description, r.urgency, r.fullName, r.age, r.pressure, r.weightIndex, r.heartIllness);
                    this.check();
                  }
                  else if(r.doctor === "Стоматолог"){
                    this.cardData(r.doctor, r.purpose, r.status, r.description, r.urgency, r.fullName, "", "", "", "", r.lastDateVisit);
                    this.check();
                  }
                })
    }
    selectDoctor(doc){
        for (let el of this._modalSelect.querySelectorAll('option')){
            if (el.value === doc){
                el.selected = true;
            }
        }
    }
    cardData(doctor = "", aim = "", status = "", desc = "", urgency = "", name = "", age = "", pressure = "", index = "", ilnesses = "", lastVisit = ""){
        this._goToSecondModal.disabled = false;
        this._modalDiv.innerHTML = "";
        this._modalDiv.innerHTML +=
            `<label>Ціль візиту:</label></br>
            <input placeholder="Ціль візиту..." class="aim" value="${aim}"></input></br>`;
        if (status === "Open"){
            this._modalDiv.innerHTML +=
                `<select class="status">
                <option value="" disabled>Статус</option>
                <option value="open" selected>Open</option>
                <option value="done">Done</option>
                </select></br>`;
        }
        else if (status === "Done"){
            this._modalDiv.innerHTML +=
                `<select class="status">
                <option value="" disabled>Статус</option>
                <option value="open">Open</option>
                <option value="done" selected>Done</option>
                </select></br>`
        }
        this._modalDiv.innerHTML +=
            `<label>Короткий опис візиту:</label></br>
            <input placeholder="Короткий опис візиту..." class="description" value="${desc}"></input></br>`
        if (urgency === "Висока"){
            this._modalDiv.innerHTML +=
                `<select class="urgency">
                  <option value="" disabled>Оберіть терміновість</option>
                  <option value="High" selected>Висока</option>
                  <option value="Normal">Нормальна</option>
                  <option value="Low">Низька</option>
                </select></br>`
        }
        else if (urgency === "Нормальна"){
            this._modalDiv.innerHTML +=
                `<select class="urgency">
                  <option value="" disabled>Оберіть терміновість</option>
                  <option value="High">Висока</option>
                  <option value="Normal" selected>Нормальна</option>
                  <option value="Low">Низька</option>
                </select></br>`
        }
        else if (urgency === "Низька"){
            this._modalDiv.innerHTML +=
                `<select class="urgency">
                  <option value="" disabled>Оберіть терміновість</option>
                  <option value="High">Висока</option>
                  <option value="Normal">Нормальна</option>
                  <option value="Low" selected>Низька</option>
                </select></br>`
        }
        this._modalDiv.innerHTML +=
        `<label>ПІБ:</label></br>
        <input placeholder="ПІБ" class="name" value="${name}"></input></br>`;
/*         if (doctor === "Терапевт"){
          this._modalDiv.innerHTML +=
          `<label>Вік:</label></br>
          <input placeholder="Вік..." class="age" value="${age}"></input></br>`
        } */
        if (doctor === "Кардіолог"){
          this._modalDiv.innerHTML +=
          `<label>Звичайний тиск:</label></br>
          <input placeholder="Звичайний тиск..." class="pressure" value="${pressure}"></input></br>
          <label>Індекс маси тіла:</label></br>
          <input placeholder="Індекс маси тіла..." class="index" value="${index}"></input></br>
          <label>Перенесені захворювання серцево-судинної системи:</label></br>
          <input placeholder="Перенесені захворювання серцево-судинної системи..." class="ilnesses" value="${ilnesses}"></input></br>
          <label>Вік:</label></br>
          <input placeholder="Вік..." class="age" value="${age}"></input></br>`;
        }
        else if (doctor === "Стоматолог"){
          this._modalDiv.innerHTML +=
          `<label>Дата останнього візиту:</label></br>
          <input placeholder="Дата останнього візиту..." class="last-visit" value="${lastVisit}"></input></br>`;
        }

        this.check();
    }

    chooseDoctor(){
      this._goToSecondModal.disabled = true;
      this._modalDiv.innerHTML = "";
      this._modalDiv.innerHTML +=
      `<label>Ціль візиту:</label></br>
      <input placeholder="Ціль візиту..." class="aim"></input></br>
      <select class="status">
        <option value="" selected disabled>Статус</option>
        <option value="open">Open</option>
        <option value="done">Done</option>
      </select></br>
      <label>Короткий опис візиту:</label></br>
      <input placeholder="Короткий опис візиту..." class="description"></input></br>
      <label>Терміновість:</label></br>
      <select class="urgency">
        <option value="" disabled>Оберіть терміновість</option>
        <option value="High">Висока</option>
        <option value="Normal">Нормальна</option>
        <option value="Low" selected>Низька</option>
      </select></br>
      <label>ПІБ:</label></br>
      <input placeholder="ПІБ" class="name"></input></br>`;

/*       if(this._modalSelect.value === "Терапевт"){
        this._modalDiv.innerHTML +=
        `</br><label>Вік:</label></br>
        <input placeholder="Вік..." class="age"></input></br>`;
      } */
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
      else if (this._modalSelect.value === "Стоматолог"){
        this._modalDiv.innerHTML +=
        `<label>Дата останнього візиту:</label></br>
        <input placeholder="Дата останнього візиту..." class="last-visit"></input></br>`;
      }

    }

    isNotEmpty(element){
      if (element.value.trim() === '') {return false};
      return true;
    }

    check(){
      for(let el of this._inputs){
        el.addEventListener("input", () => {
        this.checkAtOnce();
      })}
    }

      checkAtOnce(){
        if([...this._inputs].every(this.isNotEmpty)){
            this._goToSecondModal.disabled = false;
            this.inputAimValue = this._modalDiv.querySelector(".aim").value;
            let selectStatusValueAttribute = this._modalDiv.querySelector(".status").value;
            this.selectStatusValue = this._modalDiv.querySelector(`option[value="${selectStatusValueAttribute}"]`).textContent;
            this.inputDescriptionValue = this._modalDiv.querySelector(".description").value;
            let selectUrgencyValueAttribute = this._modalDiv.querySelector(".urgency").value;
            this.selectUrgencyValue = this._modalDiv.querySelector(`option[value="${selectUrgencyValueAttribute}"]`).textContent;
            this.inputNameValue = this._modalDiv.querySelector(".name").value;
/*             if(this._modalSelect.value === "Терапевт"){
              this.inputAgeValue = this._modalDiv.querySelector(".age").value;
            } */
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
      }

    recreateCard(doctor){
        this._modalBodyCard.innerHTML = "";
        this._modalBodyCard.innerHTML +=
          `<p><span>Ціль візиту: </span><span>${this.inputAimValue}</span></p>
          <p><span>Короткий опис візиту: </span><span>${this.inputDescriptionValue}</span><p>
          <p><span>Статус: </span><span>${this.selectStatusValue}</span></p>
          <p><span>Терміновість: </span><span>${this.selectUrgencyValue}</span></p>
          <p><span>ПІБ: </span><span>${this.inputNameValue}</span></p>`;
/*         if(doctor === "Терапевт"){
          this._modalBodyCard.innerHTML += `<p><span>Вік: </span><span>${this.inputAgeValue}</span></p>`;
        } */
        if(doctor === "Кардіолог"){
          this._modalBodyCard.innerHTML +=
          `<p><span>Звичайний тиск: </span><span>${this.inputPressureValue}</span></p>
          <p><span>Індекс маси тіла: </span><span>${this.inputIndexValue}</span><p>
          <p><span>Перенесені захворювання серцево-судинної системи: </span><span>${this.inputIlnessesValue}</span></p>
          <p><span>Вік: </span><span>${this.inputAgeValue}</span></p>`;
        }
        else if(doctor === "Стоматолог"){
          this._modalBodyCard.innerHTML += `<p><span>Дата останнього візиту: </span><span>${this.inputLastVisitValue}</span></p>`;
        }
    }

      pullGet(id){
        const data = {
            doctor        : this._modalSelect.value,
            purpose       : `${this.inputAimValue}`,
            description   : `${this.inputDescriptionValue}`,
            status        : `${this.selectStatusValue}`,
            urgency       : `${this.selectUrgencyValue}`,
            fullName      : `${this.inputNameValue}`,
            /* age           : `${this.inputAgeValue}`, */
        }

        if (this._modalSelect.value === "Кардіолог") {
          data.pressure = `${this.inputPressureValue}`
          data.weightIndex = `${this.inputIndexValue}`
          data.heartIllness = `${this.inputIlnessesValue}`
          data.age = `${this.inputAgeValue}`
        }

        if (this._modalSelect.value === "Стоматолог") {
          data.lastDateVisit = `${this.inputLastVisitValue}`

          /* delete data.age */
        }

        fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getDataFromLS('token')}`
          },
          body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then((response) => {
            if (response.id) {
              const currentArray = (getDataFromLS("array") || []).map((card) => card.id === response.id ? response : card);
              setDataToLS("array", currentArray);
              loadAndSetLocalStorage();
            }
        })
      }
      getCard(id){
        fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getDataFromLS('token')}`
                        },
                        }).then(response => response.json())
                            .then(r => {console.log(r)})
      }
}


