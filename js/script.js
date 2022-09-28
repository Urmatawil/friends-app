const button = document.querySelector("#searchBtn");
const addButton = document.querySelector("#button-add");
const results = document.querySelector("#results");
const hobbys = document.getElementById("hobby");
const genders = document.querySelector("select");
const url = "../DB.json";
let html = "";
let filter = {}

document.addEventListener("DOMContentLoaded", () => {
    genders.value = "";
});

function getUsersDB() {
    return fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
}

async function loadUsers() {
    const users = await getUsersDB();
    createCardUser(users)
}


button.addEventListener("click", resultFilter);

async function resultFilter() {
    const hobby = hobbys.value;
    const gender = genders.value;

    const users = await getUsersDB();

    if(hobby && gender){
        filter = users.filter(e => e.gender == gender && e.hobbies.includes(hobby))
        createCardUser(filter)
        return
    }
    if(gender){
        filter = users.filter(e => e.gender == gender)
        createCardUser(filter)
        return
    }
    if(hobby){
        filter = users.filter(e => e.hobbies.includes(hobby))
        createCardUser(filter)
        return
    }

    createCardUser(users)
}


function createCardUser(users){
    clearResults()

    users.forEach(({image,name,description,hobbies}) => {
        html += `
        <article class="person-row">

                <img id="profileimg" src="img/${image}" />

                <div class="person-info">
                    <h2>${name}</h2>
                    <span>${description}</span>
                    <small id="tag">Tags: ${hobbies} </small>
                </div>

                <button id="button-add" onclick="addFriend()">Add as friend</button>

            </article>
        `;
    });
    results.innerHTML = html;
    hobbys.value = "";
    genders.value = "";
}

function clearResults(){
    html = ""
    results.innerHTML = html;
    hobbys.value = "";
    genders.value = "";
}

function addFriend(){
    alert('Sorry, maybe soon...')
}