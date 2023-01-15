import {filter} from "./filter.js"
import {VisitCardiologist, VisitDentist, VisitTherapist} from "./visit.js"
import { Modal } from "./modal.js"
import { getDataFromLS, setDataToLS } from './utils.js';

const baseUrl = "https://ajax.test-danit.com/api/v2/cards"

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
            if (token === "The token does not match any known user") {
                alert('Неправильний імейл або пароль');
            } else {
                setDataToLS("token", token);
                document.querySelector(".calllogin")?.remove();
                loadAndSetLocalStorage();
                removeLoginBtn();
            }
        })
}

export const loadAndSetLocalStorage = function () {
    fetch(`${baseUrl}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getDataFromLS("token")} `,
        },
    })
        .then((resp) => resp.json())
        .then((array) => {
            setDataToLS("array", array);
            renderItems();
        })
        .catch((error) => {
            console.warn("SERVER ERROR", error);
            alert(
                "There are server. If  problems withthey persevere, please try again later."
            );

        });
};

const removeLoginBtn = () => {
    try {

        document.querySelector(".calllogin")?.remove();
        document
            .querySelector(".header")
            .insertAdjacentHTML(
                "beforeend",
                `<button type="button" class="btn btn-primary callmodal " data-bs-toggle="modal" data-bs-target="#modalSelectDoctor">
                Створити візит
                </button>`
                );
    } catch (error) {
        console.log(error)
    }

}

const renderCards = (cards, root) => {
    root.querySelector('#cardContainer')?.remove()
    root.querySelector('.nocardsinfo')?.remove()

    const container = document.createElement('div')

    container.setAttribute('class', 'cardContainer')
    container.setAttribute('id', 'cardContainer')

    cards.forEach(({
            age = "no info",
            description = "no info",
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
                const data = [ age, description, doctor, fullName, urgency, purpose, statusVisit, heartIllness, id, pressure, weightIndex, lastDateVisit, 'edit', deleteF ]

                if (doctor === "Кардіолог") {
                    new VisitCardiologist(...data).render(container);
                }

                if (doctor === "Стоматолог") {
                    new VisitDentist(...data).render(container);
                }

                if (doctor === "Терапевт") {
                    new VisitTherapist(...data).render(container);
                }
    })

    root.insertAdjacentElement('afterBegin', container)
}

const renderNoCardsInfo = (root) => {
    root.innerHTML = `<p class="nocardsinfo">Картки відсутні</p>`
}

export const renderItems = function (array = getDataFromLS("array")) {
    const root = document.querySelector('#root')

    if(array.length === 0) {
        renderNoCardsInfo(root)
    } else {
        renderCards(array, root)
    }
}

export function deleteF() {
    fetch(`${baseUrl}/${this.id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getDataFromLS("token")}`,
        },
    })
        .then((response) => {
            if (response.ok) {
                const currentArray = getDataFromLS("array")?.filter(({id}) => id !== this.id);

                setDataToLS("array", currentArray);
                renderItems();
            } else {
                throw new Error();
            }
        })
}



function init () {
    document.querySelector(".calllogin")?.addEventListener("click", () => {
        new LoginModal().render();
    });

    filter(renderItems);
    new Modal()

    if (getDataFromLS("token")) {
        removeLoginBtn()
        renderItems();
    }
}

document.addEventListener('DOMContentLoaded', init);

/* const statusesText = {
    high: 'Висока',
    low: 'Низька'
} */

/* function deleteCard(id){
    fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getDataFromLS("token")}`
        },
    })
}

deleteCard(142857) */

