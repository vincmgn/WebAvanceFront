// Fill the table with https://randomuser.me/api/?results=20 when clicking the `fetch-users` button
// Add age column
// Add gender column, with two different emojis
// Sort user by age
// Search user by name
// Add users instead of replacing them.

const fetchBtn = document.getElementById("fetch-users");
const tblBody = document.querySelector("#tbl-users tbody");
let users = []

async function fetchUsers() {
    try {
        const res = await fetch("https://randomuser.me/api/?results=20");
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}

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

fetchBtn.addEventListener("click", async () => {
    users = await fetchUsers();
    renderUsers(users);
});