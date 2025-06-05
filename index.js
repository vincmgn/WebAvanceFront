// Fill the table with https://randomuser.me/api/?results=20 when clicking the `fetch-users` button
// Add Age column
// Add gender column, with two different emojis

const fetchBtn = document.getElementById("fetch-users");
const tblBody = document.querySelector("#tbl-users tbody");
const displayTotal = document.getElementById("display-total");
const options = document.getElementById("options");
const genderSelect = document.getElementById("gender-select");
const thAge = document.getElementById("th-age");
const searchInput = document.getElementById("search-input");
let searchOptions = { gender: "none", age: "default", research: "" };
let users = []

const fetchUsers = async () => {
    try {
        const res = await fetch("https://randomuser.me/api/?results=20");
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}

const displayTotalUsers = (displayed, total) => {
    displayTotal.textContent = `${displayed} / ${total} users`;
};

const renderUsers = () => {
    let displayedUsers = [...users]

    displayedUsers = filterUsersByGender(displayedUsers);
    displayedUsers = sortUsersByAge(displayedUsers);
    displayedUsers = searchName(displayedUsers);

    tblBody.innerHTML = "";
    tblBody.innerHTML = displayedUsers.map((user) => {
        return `<tr>
            <td><img src="${user.picture.medium}" alt=""></td>
            <td>${user.name.first} ${user.name.last}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.dob.age}</td>
            <td>${user.gender === "male" ? "👨" : "👩"}</td>
        </tr>`;
    }).join("");

    displayTotalUsers(displayedUsers.length, users.length);
}

// Add users instead of replacing them.
const displayUsers = async () => {
    const fetchUser = await fetchUsers();
    users = [...users, ...fetchUser];
    renderUsers();
    displayTotalUsers(users.length, users.length);
    options.style.display = "flex";
}

fetchBtn.addEventListener("click", displayUsers);

// Filter user by gender
const filterUsersByGender = (displayedUsers) => {
    const selectedGender = genderSelect.value.toLowerCase();
    searchOptions.gender = selectedGender;


    let filteredUsers = displayedUsers;
    if (selectedGender !== "none") {
        filteredUsers = displayedUsers.filter(user => user.gender === selectedGender);
    }
    return filteredUsers;
}

genderSelect.addEventListener("change", renderUsers);

// Sort user by age
let ageSortState = "default";

const sortUsersByAge = (displayedUsers) => {
    let sortUsers = [...displayedUsers];

    switch (ageSortState) {
        case "default":
            sortUsers.sort((a, b) => a.dob.age - b.dob.age);
            document.getElementById("th-age").textContent = "Age ↓";
            searchOptions.age = "desc";
            break;
        case "desc":
            sortUsers.sort((a, b) => b.dob.age - a.dob.age);
            document.getElementById("th-age").textContent = "Age ↑";
            searchOptions.age = "asc";
            break;
        default:
            document.getElementById("th-age").textContent = "Age ⇄";
            searchOptions.age = "default";
            break;
    }
    return sortUsers;
};

const handleAgeClick = () => {
    switch (ageSortState) {
        case "default":
            ageSortState = "desc";
            break;
        case "desc":
            ageSortState = "asc";
            break;
        case "asc":
            ageSortState = "default";
            break;
    }
    renderUsers();
}

thAge.addEventListener("click", handleAgeClick);

// Search user by name
const searchName = (displayedUsers) => {
    const searchItems = removeAccents(searchInput.value.toLowerCase()).split(" ");
    searchOptions.research = searchInput.value;

    const searchUsers = displayedUsers.filter(user => {
        const lastName = removeAccents(`${user.name.last}`.toLowerCase());
        const firstName = removeAccents(`${user.name.first}`.toLowerCase());
        return searchItems.every(word =>
            lastName.startsWith(word) || firstName.startsWith(word)
        );
    })

    return searchUsers;
}

const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

searchInput.addEventListener("input", renderUsers);