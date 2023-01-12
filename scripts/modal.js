/* import {loadAndSetLocalStorage} from "./script.js" */

/*  class Visit {
    constructor(editAction, deleteAction) {
        this.divCard = document.createElement("div");
        this.bttnEdit = document.createElement("button");
        this.bttnDel = document.createElement("button");
        this.editAction = editAction;
        this.deleteAction = deleteAction;
        this.contentContainer = document.createElement("div");
    }
    createElem() {
        this.divCard.append(this.bttnEdit);
        this.divCard.append(this.bttnDel);
        this.contentContainer.classList.add("card__content-container");
        this.divCard.append(this.contentContainer);
        this.divCard.className = "card";
        this.bttnEdit.className = "card__btn card__edit";
        this.bttnEdit.innerText = "Змінити";
        this.bttnDel.className = "card__btn card__delete";
    }
    render(container = document.body) {
        this.createElem();
        container.append(this.divCard);
        this.bttnDel.addEventListener("click", this.deleteAction?.bind(this));
        this.bttnEdit.addEventListener("click", this.editAction?.bind(this));
    }
}

class VisitTherapist extends Visit {
    constructor(
        age,
        desc,
        doctor,
        fullName,
        urgency,
        purpose,
        status,
        heartIllness,
        id,
        pressure,
        weightIndex,
        lastDateVisit,
        editAction,
        deleteAction
    ) {
        super(editAction, deleteAction);
        this.age = age;
        this.desc = desc;
        this.doctor = doctor;
        this.fullName = fullName;
        this.urgency = urgency;
        this.purpose = purpose;
        this.status = status;
        this.heartIllness = heartIllness;
        this.id = id;
        this.pressure = pressure;
        this.weightIndex = weightIndex;
        this.lastDateVisit = lastDateVisit;
        this.ageContainer = document.createElement("p");
        this.descContainer = document.createElement("p");
        this.doctorContainer = document.createElement("p");
        this.fullNameContainer = document.createElement("p");
        this.urgencyContainer = document.createElement("p");
        this.purposeContainer = document.createElement("p");
        this.statusContainer = document.createElement("p");
        this.heartIllnessContainer = document.createElement("p");
        this.pressureContainer = document.createElement("p");
        this.weightIndexContainer = document.createElement("p");
        this.lastDateVisitContainer = document.createElement("p");
        this.buttonShowMoreLess = document.createElement("button");
    }
    createElem() {
        super.createElem();
        this.ageContainer.innerHTML = `<span class="visit-field-name">Вік: </span>${this.age}`;
        this.descContainer.innerHTML = `<span class="visit-field-name">Опис візіиту: </span>${this.desc}`;
        this.doctorContainer.innerHTML = `<span class="visit-field-name">Лікар: </span>${this.doctor}`;
        this.fullNameContainer.innerHTML = `<span class="visit-field-name">Ім'я: </span>${this.fullName}`;
        this.urgencyContainer.innerHTML = `<span class="visit-field-name">Терміновість: </span>${this.urgency}`;
        this.purposeContainer.innerHTML = `<span class="visit-field-name">Ціль візиту: </span>${this.purpose}`;
        this.statusContainer.innerHTML = `<span class="visit-field-name">Статус: </span>${this.status}`;
        this.buttonShowMoreLess.innerText = "Розгорнути";
        this.contentContainer.append(
            this.fullNameContainer,
            this.doctorContainer,
            this.buttonShowMoreLess
        );

        this.buttonShowMoreLess.addEventListener("click", () => {
            if (this.buttonShowMoreLess.innerText === "Розгорнути") {
                this.buttonShowMoreLess.innerText = "Згорнути";
                this.contentContainer.append(
                    this.ageContainer,
                    this.descContainer,
                    this.urgencyContainer,
                    this.purposeContainer,
                    this.statusContainer
                );
            } else {
                this.buttonShowMoreLess.innerText = "Розгорнути";
                this.ageContainer.remove();
                this.descContainer.remove();
                this.urgencyContainer.remove();
                this.purposeContainer.remove();
                this.statusContainer.remove();
            }
        });
    }
}

class VisitDentist extends Visit {
    constructor(
        age,
        desc,
        doctor,
        fullName,
        urgency,
        purpose,
        status,
        heartIllness,
        id,
        pressure,
        weightIndex,
        lastDateVisit,
        editAction,
        deleteAction
    ) {
        super(editAction, deleteAction);
        this.age = age;
        this.desc = desc;
        this.doctor = doctor;
        this.fullName = fullName;
        this.urgency = urgency;
        this.purpose = purpose;
        this.status = status;
        this.heartIllness = heartIllness;
        this.id = id;
        this.pressure = pressure;
        this.weightIndex = weightIndex;
        this.lastDateVisit = lastDateVisit;
        this.ageContainer = document.createElement("p");
        this.descContainer = document.createElement("p");
        this.doctorContainer = document.createElement("p");
        this.fullNameContainer = document.createElement("p");
        this.urgencyContainer = document.createElement("p");
        this.purposeContainer = document.createElement("p");
        this.statusContainer = document.createElement("p");
        this.heartIllnessContainer = document.createElement("p");
        this.pressureContainer = document.createElement("p");
        this.weightIndexContainer = document.createElement("p");
        this.lastDateVisitContainer = document.createElement("p");
        this.buttonShowMoreLess = document.createElement("button");
    }
    createElem() {
        super.createElem();

        this.descContainer.innerHTML = `<span class="visit-field-name">Опис візиту: </span>${this.desc}`;
        this.doctorContainer.innerHTML = `<span class="visit-field-name">Лікар: </span>${this.doctor}`;
        this.fullNameContainer.innerHTML = `<span class="visit-field-name">Ім'я: </span>${this.fullName}`;
        this.urgencyContainer.innerHTML = `<span class="visit-field-name">Терміновість: </span>${this.urgency}`;
        this.purposeContainer.innerHTML = `<span class="visit-field-name">Ціль візиту: </span>${this.purpose}`;
        this.statusContainer.innerHTML = `<span class="visit-field-name">Статус: </span>${this.status}`;
        this.buttonShowMoreLess.innerText = "Розгорнути";
        this.lastDateVisitContainer.innerHTML = `<span class="visit-field-name">Останній візит: </span>${this.lastDateVisit}`;
        this.contentContainer.append(
            this.fullNameContainer,
            this.doctorContainer,
            this.buttonShowMoreLess
        );
        this.buttonShowMoreLess.addEventListener("click", () => {
            if (this.buttonShowMoreLess.innerText === "Розгорнути") {
                this.buttonShowMoreLess.innerText = "Згорнути";
                this.contentContainer.append(
                    this.lastDateVisitContainer,
                    this.descContainer,
                    this.urgencyContainer,
                    this.purposeContainer,
                    this.statusContainer
                );
            } else {
                this.buttonShowMoreLess.innerText = "Розгорнути";
                this.lastDateVisitContainer.remove();
                this.lastDateVisitContainer.remove();
                this.descContainer.remove();
                this.urgencyContainer.remove();
                this.purposeContainer.remove();
                this.statusContainer.remove();
            }
        });
    }
}

class VisitCardiologist extends Visit {
    constructor(
        age,
        desc,
        doctor,
        fullName,
        urgency,
        purpose,
        status,
        heartIllness,
        id,
        pressure,
        weightIndex,
        lastDateVisit,
        editAction,
        deleteAction
    ) {
        super(editAction, deleteAction);
        this.age = age;
        this.desc = desc;
        this.doctor = doctor;
        this.fullName = fullName;
        this.urgency = urgency;
        this.purpose = purpose;
        this.status = status;
        this.heartIllness = heartIllness;
        this.id = id;
        this.pressure = pressure;
        this.weightIndex = weightIndex;
        this.lastDateVisit = lastDateVisit;
        this.ageContainer = document.createElement("p");
        this.descContainer = document.createElement("p");
        this.doctorContainer = document.createElement("p");
        this.fullNameContainer = document.createElement("p");
        this.urgencyContainer = document.createElement("p");
        this.purposeContainer = document.createElement("p");
        this.statusContainer = document.createElement("p");
        this.heartIllnessContainer = document.createElement("p");
        this.pressureContainer = document.createElement("p");
        this.weightIndexContainer = document.createElement("p");
        this.lastDateVisitContainer = document.createElement("p");
        this.buttonShowMoreLess = document.createElement("button");
    }
    createElem() {
        super.createElem();
        this.ageContainer.innerHTML = `<span class="visit-field-name">Вік: </span>${this.age}`;
        this.descContainer.innerHTML = `<span class="visit-field-name">Опис візиту: </span>${this.desc}`;
        this.doctorContainer.innerHTML = `<span class="visit-field-name">Лікар: </span>${this.doctor}`;
        this.fullNameContainer.innerHTML = `<span class="visit-field-name">Ім'я: </span>${this.fullName}`;
        this.urgencyContainer.innerHTML = `<span class="visit-field-name">Терміновість: </span>${this.urgency}`;
        this.purposeContainer.innerHTML = `<span class="visit-field-name">Ціль: </span>${this.purpose}`;
        this.statusContainer.innerHTML = `<span class="visit-field-name">Статус: </span>${this.status}`;
        this.heartIllnessContainer.innerHTML = `<span class="visit-field-name">Захворювання серця: </span>${this.heartIllness}`;
        this.pressureContainer.innerHTML = `<span class="visit-field-name">Тиск: </span>${this.pressure}`;
        this.weightIndexContainer.innerHTML = `<span class="visit-field-name">Індекс маси тіла: </span>${this.weightIndex}`;
        this.buttonShowMoreLess.innerText = "Розгорнути";
        this.contentContainer.append(
            this.fullNameContainer,
            this.doctorContainer,
            this.buttonShowMoreLess
        );
        this.buttonShowMoreLess.addEventListener("click", () => {
            if (this.buttonShowMoreLess.innerText === "Розгорнути") {
                this.buttonShowMoreLess.innerText = "Згорнути";
                this.contentContainer.append(
                    this.ageContainer,
                    this.heartIllnessContainer,
                    this.pressureContainer,
                    this.weightIndexContainer,
                    this.descContainer,
                    this.urgencyContainer,
                    this.purposeContainer,
                    this.statusContainer
                );
            } else {
                this.buttonShowMoreLess.innerText = "Розгорнути";
                this.ageContainer.remove();
                this.heartIllnessContainer.remove();
                this.pressureContainer.remove();
                this.weightIndexContainer.remove();
                this.descContainer.remove();
                this.urgencyContainer.remove();
                this.purposeContainer.remove();
                this.statusContainer.remove();
            }
        });
    }
} */

import {VisitTherapist, VisitDentist, VisitCardiologist} from "./visit.js";

let buttonCreateVisit = document.querySelector('.callmodal');
let modalSelect = document.querySelector('#modalSelectDoctor .modal-body select');
let modalBodySelectDoctor = document.querySelector('#modalSelectDoctor .modal-body');
let modalDiv = document.querySelector('#modalSelectDoctor .modal-body div');
let inputs = modalDiv.getElementsByTagName("input");
let goToSecondModal = document.querySelector('#modalSelectDoctor .btn-primary');
let modalBodyCard = document.querySelector('#modalCreateCard .modal-body');
let openFirstModal = document.querySelector('#modalSelectDoctor .btn-primary');
let btnCreateCard = document.querySelector('#modalCreateCard .create-card');
export let token = '7bb6bb97-4329-4af5-9071-945564d78e25';


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
  }
  chooseDoctor(){
    goToSecondModal.disabled = true;
    modalDiv.innerHTML = "";
      modalDiv.innerHTML += 
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
      if(modalSelect.value === "Therapist"){
        modalDiv.innerHTML +=
        `</br><label>Вік:</label></br>
        <input placeholder="Вік..." class="age"></input></br>`;
      }
      else if (modalSelect.value === "Cardiologist"){
        modalDiv.innerHTML +=
        `<label>Звичайний тиск:</label></br>
        <input placeholder="Звичайний тиск..." class="pressure"></input></br>
        <label>Індекс маси тіла:</label></br>
        <input placeholder="Індекс маси тіла..." class="index"></input></br>
        <label>Перенесені захворювання серцево-судинної системи:</label></br>
        <input placeholder="Перенесені захворювання серцево-судинної системи..." class="ilnesses"></input></br>
        <label>Вік:</label></br>
        <input placeholder="Вік..." class="age"></input></br>`;
      }
      else if (modalSelect.value === "Dentist"){
        modalDiv.innerHTML +=
          `<label>Дата останнього візиту:</label></br>
          <input placeholder="Дата останнього візиту..." class="last-visit"></input></br>`;
      }
      
  }

  isNotEmpty(element){
    if (element.value === '' || element.value === ' ') {
      return false;
    }
    else return true;
  }

  check(){
    for(let el of inputs){
      el.addEventListener("input", () => {
        if([...inputs].every(this.isNotEmpty)){
          goToSecondModal.disabled = false;
          this.inputAimValue = modalDiv.querySelector(".aim").value;
          let selectStatusValueAttribute = modalDiv.querySelector(".status").value;
          this.selectStatusValue = modalDiv.querySelector(`option[value="${selectStatusValueAttribute}"]`).textContent;
          this.inputDescriptionValue = modalDiv.querySelector(".description").value;
          let selectUrgencyValueAttribute = modalDiv.querySelector(".urgency").value;
          this.selectUrgencyValue = modalDiv.querySelector(`option[value="${selectUrgencyValueAttribute}"]`).textContent;
          this.inputNameValue = modalDiv.querySelector(".name").value;
          if(modalSelect.value === "Therapist"){
            this.inputAgeValue = modalDiv.querySelector(".age").value;
          }
          else if(modalSelect.value === "Cardiologist"){
            this.inputAgeValue = modalDiv.querySelector(".age").value;
            this.inputPressureValue = modalDiv.querySelector(".pressure").value;
            this.inputIndexValue = modalDiv.querySelector(".index").value;
            this.inputIlnessesValue = modalDiv.querySelector(".ilnesses").value;
          }
          else if(modalSelect.value === "Dentist"){
            this.inputLastVisitValue = modalDiv.querySelector(".last-visit").value;
          }
        }
        else{
          goToSecondModal.disabled = true;
        }
      })
    }
  }
  createCard(){
    modalBodyCard.innerHTML = "";
    modalBodyCard.innerHTML += 
      `<p><span>Ціль візиту: </span><span>${this.inputAimValue}</span></p>
      <p><span>Короткий опис візиту: </span><span>${this.inputDescriptionValue}</span><p>
      <p><span>Статус: </span><span>${this.selectStatusValue}</span></p>
      <p><span>Терміновість: </span><span>${this.selectUrgencyValue}</span></p>
      <p><span>ПІБ: </span><span>${this.inputNameValue}</span></p>`;
    if(modalSelect.value === "Therapist"){
      modalBodyCard.innerHTML += `<p><span>Вік: </span><span>${this.inputAgeValue}</span></p>`;
    }
    else if(modalSelect.value === "Cardiologist"){
      modalBodyCard.innerHTML += 
      `<p><span>Звичайний тиск: </span><span>${this.inputPressureValue}</span></p>
      <p><span>Індекс маси тіла: </span><span>${this.inputIndexValue}</span><p>
      <p><span>Перенесені захворювання серцево-судинної системи: </span><span>${this.inputIlnessesValue}</span></p>
      <p><span>Вік: </span><span>${this.inputAgeValue}</span></p>`;
    }
    else if(modalSelect.value === "Dentist"){
      modalBodyCard.innerHTML += `<p><span>Дата останнього візиту: </span><span>${this.inputLastVisitValue}</span></p>`;
    }
  }
  postGet(){
    console.log(modalSelect.value);
    if(modalSelect.value === "Therapist"){
        fetch("https://ajax.test-danit.com/api/v2/cards", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        },
        body: JSON.stringify({
            purpose: `${this.inputAimValue}`,
            description: `${this.inputDescriptionValue}`,
            doctor: 'Therapist',
            status: `${this.selectStatusValue}`,
            urgency: `${this.selectUrgencyValue}`,
            fullName: `${this.inputNameValue}`,
            age: `${this.inputAgeValue}`,
        })
        })
        .then(response => response.json())
        .then(response => console.log(response))
    }
    else if (modalSelect.value === "Cardiologist"){
        fetch("https://ajax.test-danit.com/api/v2/cards", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
            body: JSON.stringify({
                purpose: `${this.inputAimValue}`,
                description: `${this.inputDescriptionValue}`,
                doctor: 'Cardiologist',
                status: `${this.selectStatusValue}`,
                urgency: `${this.selectUrgencyValue}`,
                fullName: `${this.inputNameValue}`,
                pressure: `${this.inputPressureValue}`,
                weightIndex: `${this.inputIndexValue}`,
                heartIllness: `${this.inputIlnessesValue}`,
                age: `${this.inputAgeValue}`
            })
        })
        .then(response => response.json())
        .then(response => console.log(response))
    }
    else if (modalSelect.value === "Dentist"){
        fetch("https://ajax.test-danit.com/api/v2/cards", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        },
        body: JSON.stringify({
            purpose: `${this.inputAimValue}`,
            description: `${this.inputDescriptionValue}`,
            doctor: 'Dentist',
            status: `${this.selectStatusValue}`,
            urgency: `${this.selectUrgencyValue}`,
            fullName: `${this.inputNameValue}`,
            lastDateVisit: `${this.inputLastVisitValue}`,
        })
        })
        .then(response => response.json())
        .then(response => console.log(response))
    }
  }
  getCardById(id){
    fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
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
                        ""
                    ).render(container);
                }
            })
  }
  getCards(){
    let cardsAmount;
    fetch("https://ajax.test-danit.com/api/v2/cards", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        cardsAmount = response.length;
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
        'Authorization': `Bearer ${token}`
      },
    })
  }
}

let userModal = new Modal();
goToSecondModal.disabled = true;
// for(let i = 0; i < )
/* userModal.deleteCard(142130); */
userModal.getCards();
// console.log(arr.length);
// userModal.getCardById(141890);
modalSelect.addEventListener("change", () => {
  userModal.chooseDoctor();
  userModal.check();
});

goToSecondModal.addEventListener("click", () => {
  userModal.createCard();
})

btnCreateCard.addEventListener("click", () => {
  userModal.postGet();
  /* getFromLocalStorage(); */
  loadAndSetLocalStorage();
  goToSecondModal.disabled = true;
  modalDiv.innerHTML = "";
})














/* new VisitCardiologist(
    25,
    'desc',
    'doctor',
    'fullName',
    'urgency',
    'purpose',
    'statusVisit',
    'heartIllness',
    'id',
    'pressure',
    'weightIndex',
    'lastDateVisit',
    'edit',
    'deleteF'
).render(container);
 */

// new VisitDentist(
//     'age',
//     'desc',
//     'doctor',
//     'fullName',
//     'urgency',
//     'purpose',
//     'statusVisit',
//     'heartIllness',
//     'id',
//     'pressure',
//     'weightIndex',
//     'lastDateVisit',
//     'edit',
//     'deleteF'
// ).render(container);


/* new VisitTherapist(
    age,
    desc,
    doctor,
    fullName,
    urgency,
    purpose,
    statusVisit,
    heartIllness,
    id,
    pressure,
    weightIndex,
    lastDateVisit,
    edit,
    deleteF
).render(container); */