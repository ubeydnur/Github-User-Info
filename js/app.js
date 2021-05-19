const formDom = document.querySelector('#github-form')
const inputDom = document.querySelector('#github-name')
const clearLastUsersDom = document.querySelector('#clear-last-users')
const lastUsersDom = document.querySelector('#last-users')

const github = new Github()
const ui = new UI()

eventListeners()

function eventListeners() {
    formDom.addEventListener('submit', getData)
    clearLastUsersDom.addEventListener('click', clearAllSearched)

    document.addEventListener('DOMContentLoaded', getAllSearched)
}

function getData(e) {
    let userName = inputDom.value.trim()

    if (userName === '') {
        alert("Lütfen geçerli bir kullanıcı adı giriniz")
    }
    else {
        github.getGithubData(userName)
            .then(response => {
                if (response.user.message === "Not Found") {
                    //Hata mesajı
                    ui.showError("Lütfen geçerli bir kullanıcı adı girin!!", 'danger')
                }
                else {
                    ui.addSearchedUserToUI(userName)
                    Storage.addSearchedUserToStorage(userName)
                    ui.showUserInfo(response.user)
                    ui.showRepoInfo(response.repo)
                }
            })
            .catch(err => ui.showError(err))
    }

    ui.clearInput()

    e.preventDefault()
}

//Tüm aramaları temizle
function clearAllSearched() {
    if (confirm('Are you sure ?')) {
        //Silme
        Storage.clearAllSearchedUsersFromStorage()//Storageden silecek
        ui.clearAllSearchedFromUI()
    }
}

//Arananları storageden al
function getAllSearched() {
    let users = Storage.getSearchedUsersFromStorage()

    let result = ""

    users.forEach(user => {
        result += `<li class="list-group-item">${user}</li>`
    })

    lastUsersDom.innerHTML = result
}
