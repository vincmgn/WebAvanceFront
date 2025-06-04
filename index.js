// Fill the table with https://randomuser.me/api/?results=20 when clicking the `fetch-users` button
// Add Age column
// Add gender column, with two different emojis

// Sort user by age
// Search user by name
// Add users instead of replacing them.

const fetchBtn = document.getElementById("fetch-users");
const tblBody = document.querySelector("#tbl-users tbody");
const displayTotal = document.getElementById("display-total");
const options = document.getElementById("options");
const genderSelect = document.getElementById("gender-select");
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

const renderUsers = (users) => {
    tblBody.innerHTML = "";
    tblBody.innerHTML = users.map((user) => {
        return `<tr>
            <td><img src="${user.picture.medium}" alt=""></td>
            <td>${user.name.first} ${user.name.last}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.dob.age}</td>
            <td>${user.gender === "male" ? "👨" : "👩"}</td>
        </tr>`;
    }).join("");
}

const displayUsers = async () => {
    users = await fetchUsers();
    renderUsers(users);
    displayTotalUsers(users.length, users.length);
    options.style.display = "flex";
}

fetchBtn.addEventListener("click", displayUsers);

// Filter user by gender
const filterUsersByGender = () => {
    const selectedGender = genderSelect.value.toLowerCase();
    let filteredUsers = users;
    if (selectedGender !== "none") {
        filteredUsers = users.filter(user => user.gender === selectedGender);
    }
    renderUsers(filteredUsers);
    displayTotalUsers(filteredUsers.length, users.length);
}

genderSelect.addEventListener("change", filterUsersByGender);