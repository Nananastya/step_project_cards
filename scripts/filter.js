let filteredArray = [];
export const container = document.querySelector(".container");

if (JSON.parse(localStorage.getItem("token"))) {
  document.querySelector(".calllogin")?.remove();
  getFromLocalStorage();
}

export function filter() {
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