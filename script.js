
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
    <p><span>CreatedAt:</span> ${new Date(createdAt).toDateString()}</p>
    </div>
    <button class= "delete button" onclick="deleteUserData(${id})"><span>Delete</span></button>
    <button class= "edit button" onclick="editUserData(${id},'${name}' ,'${avatar}', '${createdAt}')"><span>Edit</span></button>
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

async function addUsertoApi() {
    const name = document.querySelector(".username").value;
    const avatar = document.querySelector(".avatar").value;

    const newUserData = {
        createdAt: new Date().toISOString(),
        name: name,
        avatar: avatar,
    }
    console.log(newUserData);
    await fetch("https://6120e98a24d11c001762ee35.mockapi.io/users",
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUserData)
        }
    )
    getUserData();

    document.querySelector(".username").value = "";
    document.querySelector(".avatar").value = ""
}

async function editUserData(id, name, avatar, createdAt) {

    // document.querySelector(".user-info>p:nth-child(1)").innerHTML = ""
    // document.querySelector(".user-info>p:nth-child(2)").innerHTML = ""
    // document.querySelector(".user-info>p:nth-child(1)").innerHTML = `
    // <input type="text" class="username" placeholder="Update Username">
    // <input type="text" class="username" placeholder="Update Profile Pic">`
    console.log("editing user ---- " + id + name + avatar);
    const updatedName = prompt("Update your name", name);
    const updatedAvatar = prompt("update your profile pic", avatar);
    console.log(updatedName);
    console.log(updatedAvatar)

    const updatedUserData = {
        createdAt: createdAt,
        name: updatedName,
        avatar: updatedAvatar,
    }
    if (updatedName.length === 0 || updatedAvatar.length === 0) {
        alert("It is mandatory to fill both name & profile pic URL")
    }
    else {
        await fetch(`https://6120e98a24d11c001762ee35.mockapi.io/users/${id}`,
            {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUserData)
            }
        );

        getUserData()
    }

}
