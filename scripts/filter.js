import { findValueInData, getDataFromLS, getValueFromElement } from './utils.js';

export function filter(renderItems) {
  document.querySelector(".filtersub").addEventListener("click", () => {
    const filteredArray = getDataFromLS("array").filter(
      ({ doctor, fullName, description, purpose, status, urgency }) => {
          const searchValue = getValueFromElement('#search')
          const statusValue = getValueFromElement('#filterStatus')
          const urgencyValue = getValueFromElement("#filterUrgency")


          const hasSearch = findValueInData(doctor, searchValue) ||
                            findValueInData(fullName, searchValue) ||
                            findValueInData(description, searchValue) ||
                            findValueInData(purpose, searchValue)

          const hasStatus = findValueInData(status, statusValue)
          const hasUrgency = findValueInData(urgency, urgencyValue)

          return hasSearch && hasStatus && hasUrgency
      });

    renderItems(filteredArray);
  })
}