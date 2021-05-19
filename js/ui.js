class UI {
    constructor() {
        this.profileDiv = document.querySelector('#profile')
        this.repoDiv = document.querySelector('#repos')
        this.lastUsers = document.querySelector('#last-users')
        this.inputField = document.querySelector('#github-name')
        this.alertDom = document.querySelector('#alert')
    }

    clearInput() {
        this.inputField.value = ''
    }

    showError(message, type) {
        const alert = document.createElement('div')

        alert.className = `alert alert-${type} text-center w-75 mx-auto`
        alert.role = 'alert'
        alert.textContent = message

        this.alertDom.appendChild(alert)

        setTimeout(() => {
            alert.remove()
        }, 2000)
    }

    showUserInfo(user) {
        this.profileDiv.innerHTML = `
            <div class="card my-5 shadow bg-white rounded">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4">
                            <a href="${user.html_url}" target="_blank">
                                <img class="img-fluid rounded "
                                src="${user.avatar_url}">
                            </a>
                            <div id="fullName" class="mt-2">
                                <strong>${user.name}</strong>
                            </div>
                            <div id="bio">${user.bio}</div>
                        </div>
                        <div class="col-md-8">
                            <div class="border-bottom pb-3">
                                <button class="btn btn-primary">
                                    Takipçi <span class="badge badge-light">${user.followers}</span>
                                </button>
                                <button class="btn btn-info">
                                    Takip Edilen <span class="badge badge-light">${user.following}</span>
                                </button>
                                <button class="btn btn-danger">
                                    Repolar <span class="badge badge-light">${user.public_repos}</span>
                                </button>
                            </div>
                            <div>
                                <li class="list-group-item borderzero">
                                    <i class="fas fa-user"></i> <span id="company">${user.company}</span>
                                </li>
                                <li class="list-group-item borderzero">
                                    <i class="fas fa-map-marker-alt"></i> <span id="location">${user.location}</a>
                                </li>
                                <li class="list-group-item borderzero">
                                    <i class="far fa-envelope"></i> <span id="mail">${user.email}</span>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    showRepoInfo(repos) {
        this.repoDiv.innerHTML = ""

        repos.forEach(repo => {
            this.repoDiv.innerHTML += `
                            <div class="row mt-3">
                                <div class="col-md-6 pt-1">
                                    <a href="${repo.html_url}" target="_blank" id="repoName">${repo.name}</a>
                                </div>
                                <div class="col-md-6">
                                    <button class="btn btn-secondary">
                                        Stars <span class="badge badge-light" id="repoStar">${repo.startgazers_count}</span>
                                    </button>
                                    <button class="btn btn-info">
                                        Forks <span class="badge badge-light" id="repoFork">${repo.forks_count}</span>
                                    </button>
                                </div>
                            </div>
            `
        })
    }

    addSearchedUserToUI(userName) {
        let users = Storage.getSearchedUsersFromStorage()

        if (users.indexOf(userName) === -1) {
            const li = document.createElement('li')

            li.className = 'list-group-item'
            li.textContent = userName

            this.lastUsers.appendChild(li)
        }
    }

    clearAllSearchedFromUI() {
        while (this.lastUsers.firstElementChild !== null) {
            this.lastUsers.removeChild(this.lastUsers.firstElementChild)
        }
    }

}