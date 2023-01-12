import {filter} from "./filter.js"
import {Visit, VisitCardiologist, VisitDentist, VisitTherapist} from "./visit.js"
import {Modal} from "./modal.js"


const baseUrl = "https://ajax.test-danit.com/api/v2/cards"
let currentArray = [];


class LoginModal {
    constructor(confirmL) {
        this._modalElement = document.createElement("div");
        this._backgroundContainer = document.createElement("div");
        this._mainContainer = document.createElement("div");
        this._contentContainer = document.createElement("div");
        this._buttonContainer = document.createElement("div");
        this._closeButton = document.createElement("div");
        this.form = document.createElement("form");
        this.inputLogin = document.createElement("input");
        this.inputPassWord = document.createElement("input");
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
                confirmL(this.inputLogin.value, this.inputPassWord.value);
                this.closeModal();
            }
        });
    }
    render(container = document.body) {
        this.createElements();
        container.append(this._modalElement);
    }

}

document.querySelector(".calllogin")?.addEventListener("click", () => {
    new LoginModal().render();
});


const loadAndSetLocalStorage = function () {
    fetch(`${baseUrl}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))} `,
        },
    })
        .then((resp) => resp.json())
        .then((array) => {
            localStorage.setItem("array", JSON.stringify(array));
            currentArray = JSON.parse(localStorage.getItem("array"));
            getFromLocalStorage();
        })
};


const confirmL = function (inputLogin, inputPassWord) {
    fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: `${inputLogin}`,
            password: `${inputPassWord}`,
        }),
    })
        .then((response) => response.text())
        .then((token) => {
            if (token === "Incorrect username or password") {
                alert('Неправильний імейл або пароль');
            } else {
                localStorage.setItem("token", JSON.stringify(token));
                document.querySelector(".calllogin")?.remove();
                
                loadAndSetLocalStorage();
            }
        })
}

export function deleteF() {
    fetch(`${baseUrl}/${this.id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
    })
        .then((response) => {
            currentArray = JSON.parse(localStorage.getItem("array"));
            if (response.ok) {
                currentArray.splice(
                    currentArray.indexOf(currentArray.find((el) => el.id === this.id)),
                    1
                );
                localStorage.setItem("array", JSON.stringify(currentArray));
                document.querySelectorAll(".card").forEach((el) => el.remove());
                getFromLocalStorage();
            } else {
                throw new Error();
            }
        })
}



export const getFromLocalStorage = function (
    array = JSON.parse(localStorage.getItem("array"))
) {
    if (!Array.isArray(JSON.parse(localStorage.getItem("array")))) {
        loadAndSetLocalStorage();
    }
    document.querySelector(".callmodal")?.remove(); 
    document
        .querySelector(".header")
        .insertAdjacentHTML(
            "beforeend",
            /* `<button class="callmodal">Створити візит</button>` */
            `<button type="button" class="btn btn-primary callmodal " data-bs-toggle="modal" data-bs-target="#modalSelectDoctor">
            Створити візит
          </button>`
        );
        document.querySelector(".callmodal")?.addEventListener("click", () => {
        /* new LoginModal().render(); */
    });
    console.log(array.length)
    if (array.length === 0) {
        if (document.querySelector(".filtersub").innerText === "FILTER") {
            document.querySelector('.container').style.display = 'grid';
            document
                .querySelector(".container")
                .insertAdjacentHTML(
                    "afterbegin",
                    `<p class="nocardsinfo">Картки відсутні</p>`
                );
        } else {
            document.querySelector('.container').style.display = 'block';
            document
                .querySelector(".container")
                .insertAdjacentHTML(
                    "afterbegin",
                    `<p class="nocardsinfo">Картки відсутні</p>`
                );
        }
    } else {
        document.querySelector(".nocardsinfo")?.remove();

        array.forEach(
            ({
                 age = "no info",
                 desc = "no info",
                 doctor = "no info",
                 fullName = "no info",
                 urgency = "no info",
                 purpose = "no info",
                 status: statusVisit = "no info",
                 heartIllness = "no info",
                 id,
                 pressure = "no info",
                 weightIndex = "no info",
                 lastDateVisit = "no info",
             }) => {
                if (doctor === "Cardiologist") {
                    new VisitCardiologist(
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
/*                         edit, */
                        deleteF
                    ).render(container);
                } else if (doctor === "Dentist") {
                    new VisitDentist(
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
/*                         edit, */
                        deleteF
                    ).render(container);
                } else if (doctor === "Therapist") {
                    new VisitTherapist(
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
/*                         edit, */
                        deleteF
                    ).render(container);
                }
            }
        );
    }
};

if (JSON.parse(localStorage.getItem("token"))) {
    document.querySelector(".calllogin")?.remove();
    getFromLocalStorage();
}

filter();










/* 
export class Visit {
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
} */

/* export class VisitTherapist extends Visit {
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
} */

/* export class VisitDentist extends Visit {
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

export class VisitCardiologist extends Visit {
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


new VisitDentist(
    'age',
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
).render(container); */



/* let filteredArray = [];
export const container = document.querySelector(".container");

if (JSON.parse(localStorage.getItem("token"))) {
  document.querySelector(".calllogin")?.remove();
  getFromLocalStorage();
}

function filter() {
  document.querySelector(".filtersub").addEventListener("click", () => {
    document.querySelector(".nocardsinfo")?.remove();
    filteredArray = JSON.parse(localStorage.getItem("array")).filter(
        ({ doctor, fullName, desc, purpose, status, urgency }) => {
          const searchValue = getValueFromElement('#search')?.toLowerCase()
          return (
            findValueInData(doctor, searchValue) ||
            findValueInData(fullName, searchValue) ||
            findValueInData(desc, searchValue) ||
            findValueInData(purpose, searchValue) &&
            findValueInData(status, getValueFromElement('#filterStatus')) &&
            findValueInData(urgency, document.querySelector("#filterUrgency").value)
          )
  
        }
    );
    document.querySelectorAll(".card").forEach((el) => el.remove());
    getFromLocalStorage(filteredArray);
  })
  

}


const findValueInData = (primary, inserted) => {
  return primary?.toLowerCase()?.includes(inserted)
}

const getValueFromElement = (selector) => {

  return document.querySelector(selector).value || ''
}

filter();
 */






/* class Modal {
    constructor() {
        this._modalElement = document.createElement("div");
        this._backgroundContainer = document.createElement("div");
        this._mainContainer = document.createElement("div");
        this._contentContainer = document.createElement("div");
        this._buttonContainer = document.createElement("div");
        this._closeButton = document.createElement("div");
    }
    closeModal() {
        this._modalElement.remove();
    }
    createElements() {
        this._modalElement.classList.add("modal");
        this._modalElement.append(this._backgroundContainer);
        this._backgroundContainer.classList.add("modal__background");
        this._backgroundContainer.addEventListener(
            "click",
            this.closeModal.bind(this)
        );
        this._modalElement.append(this._mainContainer);
        this._mainContainer.classList.add("modal__main-container");
        this._mainContainer.append(this._contentContainer);
        this._mainContainer.append(this._buttonContainer);
        this._mainContainer.append(this._closeButton);
        this._contentContainer.classList.add("modal__content-wrapper");
        this._buttonContainer.classList.add("modal__button-wrapper");
        this._closeButton.classList.add("modal__close");
        this._closeButton.addEventListener("click", this.closeModal.bind(this));
    }
    render(container = document.body) {
        this.createElements();
        container.append(this._modalElement);
    }
}
class LoginModal extends Modal {
    constructor(confirmL) {
        super();
        this.form = document.createElement("form");
        this.inputLogin = document.createElement("input");
        this.inputPassWord = document.createElement("input");
        this.confirmBttn = document.createElement("button");
        this.noInfoMessage = document.createElement("p");
        this.confirmL = confirmL;
    }
    createElements() {
        super.createElements();

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
                confirmL(this.inputLogin.value, this.inputPassWord.value);
                this.closeModal();
            }
        });
    }
} */





/* class Modal {
    constructor() {
        this._modalElement = document.createElement("div");
        this._backgroundContainer = document.createElement("div");
        this._mainContainer = document.createElement("div");
        this._contentContainer = document.createElement("div");
        this._buttonContainer = document.createElement("div");
        this._closeButton = document.createElement("div");
    }
    closeModal() {
        this._modalElement.remove();
    }
    createElements() {
        this._modalElement.classList.add("modal");
        this._modalElement.append(this._backgroundContainer);
        this._backgroundContainer.classList.add("modal__background");
        this._backgroundContainer.addEventListener(
            "click",
            this.closeModal.bind(this)
        );
        this._modalElement.append(this._mainContainer);
        this._mainContainer.classList.add("modal__main-container");
        this._mainContainer.append(this._contentContainer);
        this._mainContainer.append(this._buttonContainer);
        this._mainContainer.append(this._closeButton);
        this._contentContainer.classList.add("modal__content-wrapper");
        this._buttonContainer.classList.add("modal__button-wrapper");
        this._closeButton.classList.add("modal__close");
        this._closeButton.addEventListener("click", this.closeModal.bind(this));
    }
    render(container = document.body) {
        this.createElements();
        container.append(this._modalElement);
    }
} */



  























































