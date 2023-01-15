import {filter} from "./filter.js"
import {VisitCardiologist, VisitDentist, VisitTherapist} from "./visit.js"
import { Modal, LoginModal } from "./modal.js"
import { getDataFromLS, setDataToLS } from './utils.js';

const baseUrl = "https://ajax.test-danit.com/api/v2/cards"

const ERRORS = ['Incorrect username or password', "The token does not match any known user"]

export const confirmL = async function (inputLogin, inputPassWord, callback) {
    const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: `${inputLogin}`,
            password: `${inputPassWord}`,
        }),
    })

    if (response.status >= 400) {
        return alert(await response.text())
    }

    const token = await response.text()

    setDataToLS("token", token);
    document.querySelector(".calllogin")?.remove();
    loadAndSetLocalStorage();
    removeLoginBtn();
    callback()

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
            renderItems(array);
        })
        .catch((error) => {
            console.warn("SERVER ERROR", error);
            alert(
                "Проблеми з сервером"
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
                renderItems(currentArray);
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
        loadAndSetLocalStorage();
    }
}

document.addEventListener('DOMContentLoaded', init);