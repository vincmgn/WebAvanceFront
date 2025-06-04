// Fill the table with https://randomuser.me/api/?results=20 when clicking the `fetch-users` button
// Add age column
// Add gender column, with two different emojis
// Sort user by age
// Search user by name
// Add users instead of replacing them.

const fetchBtn = document.getElementById("fetch-users");
const table = document.getElementById("tbl-users");
const tblBody = document.querySelector("#tbl-users tbody");
let users = []

async function fetchUsers() {
    const res = await fetch("https://randomuser.me/api/?results=20");
    const data = await res.json();
    return data.results;
}

function renderUsers(users) {
    tblBody.innerHTML = "";
    users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${user.picture.medium}" alt="User Photo"></td>
            <td>${user.name.first} ${user.name.last}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
          `;
        tblBody.appendChild(row);
    });
}

fetchBtn.addEventListener("click", async () => {
    try {
        users = await fetchUsers();
        renderUsers(users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
});