
const addUser = (name, createdAt, avatar, id) => {
    const usersLists = document.querySelector('.user-lists')
    const user = document.createElement("div");
    user.setAttribute("class", "user")
    user.innerHTML =
        `
    <img src = ${avatar} class="user-pic">
    <div class = "user-action">
    <div class = "user-info">
    <p>${name}</p>
    <p>CreatedAt: ${createdAt}</p>
    </div>
    <div class="delete-btn">
    <button onclick="deleteUserData(${id})">Delete</button>
    </div>
    </div>
    `
    usersLists.append(user)
}


async function getUserData() {
    const usersData = await fetch("https://6120e98a24d11c001762ee35.mockapi.io/users", { method: "GET" });
    const usersJsonData = await usersData.json();
    console.log(usersJsonData);
    document.querySelector('.user-lists').innerHTML = ``;
    usersJsonData.forEach(user => {
        addUser(user.name, user.createdAt, user.avatar, user.id)
    });
}

getUserData();

async function deleteUserData(id) {
    console.log("deleting user....", id)
    const usersData = await fetch(`https://6120e98a24d11c001762ee35.mockapi.io/users/${id}`, { method: "DELETE" });
    const usersJsonData = await usersData.json();
    console.log(usersJsonData)
    getUserData();
}

