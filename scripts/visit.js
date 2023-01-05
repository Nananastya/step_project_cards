class Visit {
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
        this.bttnDel.addEventListener("click", this.deleteAction.bind(this));
        this.bttnEdit.addEventListener("click", this.editAction.bind(this));
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
        this.buttonShowMoreLess.innerText = "Show more";
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
}

new VisitCardiologist(
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
).render(container);


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
    edit,
    deleteF
).render(container);