const determineSign = (month, day) => {
    switch(month){
        case "01": if(day < 21) {
            return "Capricorn";
        } else { 
            return "Aquarius"
        }
        case "02": if(day < 20) {
            return "Aquarius";
        } else { 
            return "Pisces"
        }
        case "03": if(day < 20) {
            return "Pisces";
        } else { 
            return "Aries"
        }
        case "04": if(day < 20) {
            return "Aries";
        } else { 
            return "Taurus"
        }
        case "05": if(day < 20) {
            return "Taurus";
        } else { 
            return "Gemini"
        }
        case "06": if(day < 21) {
            return "Gemini";
        } else { 
            return "Cancer"
        }
        case "07": if(day < 22) {
            return "Cancer";
        } else { 
            return "Leo"
        }
        case "08": if(day < 24) {
            return "Leo";
        } else { 
            return "Virgo"
        }
        case "09": if(day < 23) {
            return "Virgo";
        } else { 
            return "Libra"
        }
        case "10": if(day < 24) {
            return "Libra";
        } else { 
            return "Scorpio"
        }
        case "11": if(day < 23) {
            return "Scorpio";
        } else { 
            return "Sagittarius"
        }
        case "12": if(day < 22) {
            return "Sagittarius";
        } else { 
            return "Capricorn"
        }
    }
}

const clearMain = () => {
    while(mainContent.firstChild) {
        mainContent.removeChild(mainContent.lastChild);
    }
}

const clearTop = () => {
    while(personToMatch.firstChild) {
        personToMatch.removeChild(personToMatch.lastChild);
    }
}

const mainContent = document.querySelector(".main-content");
const matchButton = document.querySelector(".match-button");
const personToMatch = document.querySelector(".person-to-match")

matchButton.addEventListener("click", () => {
    clearMain();
    clearTop();
    displayAllParticipants(randomPersonData);
})

const displayAllParticipants = (allParticipants) => {

    let result = allParticipants.filter(item => item.age > 18)
    .filter(item => item.name !== "")
    .sort((a,b)=> (a.name > b.name ? 1 : -1));

    for (let value of result) {
        let day = value.birthday.dmy.substr(0,2);
        let month = value.birthday.dmy.substr(3,2)

        value["sign"] = determineSign(month, day);

        let listItem = mainContent.appendChild(document.createElement('li'));
        listItem.classList.add("list-item");
        listItem.innerHTML = `<img src=${value.photo}>` + value.name + " " + value.surname + ", " + value.region + ", " + value.age + ", " + value.sign
        + `<button class="person-to-match" value=${value.sign}>Find my match!</button>`;

        const personToMatchButton = listItem.lastChild;

        personToMatchButton.addEventListener("click", () => {
        findSuiters(value.sign, result, value.name);
        listItem = personToMatch.appendChild(document.createElement('li'));
        listItem.classList.add("list-item");
        listItem.innerHTML = `<img src=${value.photo}>` + value.name + " " + value.surname + ", " + value.region + ", " + value.age + ", " + value.sign;
        })
    }
}

const findSuiters = (sign, result, name) => {
    let matchedResults = result.filter(item => item.sign === sign)
    .filter(item => item.name !== name);
    while(mainContent.firstChild) {
        mainContent.removeChild(mainContent.lastChild);
    }
    for (let value of matchedResults) {
        let listItem = mainContent.appendChild(document.createElement('li'));
        listItem.classList.add("list-item");
        listItem.innerHTML = `<img src=${value.photo}>` + value.name + " " + value.surname + ", " + value.region + ", " + value.age + ", " + value.sign;
        const matchingButton = listItem.appendChild(document.createElement("button"));
        matchingButton.innerHTML = "Date please!"
        matchingButton.addEventListener("click", () => {
            clearMain();
            listItem = personToMatch.appendChild(document.createElement('li'));
            listItem.classList.add("list-item");
            listItem.innerHTML = `<img src=${value.photo}>` + value.name + " " + value.surname + ", " + value.region + ", " + value.age + ", " + value.sign;
        })
    }
}