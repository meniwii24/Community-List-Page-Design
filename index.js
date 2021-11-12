const BASE_URL = "https://lighthouse-user-api.herokuapp.com";
const INDEX_URL = BASE_URL + "/api/v1/users";
const users = [];
const dataPanel = document.querySelector("#data-panel");

function renderUserList(data) {
  let rawHTML = "";
  data.forEach((item) => {
    rawHTML += `
    <div class="col-sm-2">
      <div class="mb-2">
        <div class="card" data-modal-user-id="${item.id}">
          <img src="${item.avatar}"class="card-img-top" alt="user photo" data-toggle="modal" data-target="#user-modal" data-id="${item.id}"/>
          <div class="card-body" data-modal-user-id="${item.id}">
            <p class="cardTitle">${item.name +" "+ item.surname}</p>
          </div>
        </div>
      </div>
    </div>`;
  });
  dataPanel.innerHTML = rawHTML
}

function showUserModal(id) {
  const userTitle = document.querySelector('#user-modal-title')
  const userImage = document.querySelector('#user-modal-image')
  const userInfo = document.querySelector('#user-modal-info')
  
  axios
  .get(INDEX_URL + "/" + id)
  .then(function(response) {
    const data = response.data
    console.log(response.data)
    userTitle.innerText = data.name + " " + data.surname
    userImage.innerHTML = `<img src="${data.avatar}" alt="user-img" class="img-fluid">`
    userInfo.innerHTML = `
    <p>email:${data.email}</p>
    <p>gender:${data.gender}</p>
    <p>age:${data.age}</p>
    <p>region:${data.region}</p>
    <p>birthday:${data.birthday}</p>`
  })

  .catch(function(error){
    console.log(error)
  })
}

dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.card-img-top')) {
      showUserModal(Number(event.target.dataset.id))
      }
})

axios
  .get(INDEX_URL)
  .then(function (response) {
    users.push(...response.data.results)
    renderUserList(users)
  })
  .catch(function (error) {
    console.log(error);
  });

