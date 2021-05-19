class Storage {
    static getSearchedUsersFromStorage() {
        //Tüm kullanıcıları al
        let users;
        if (localStorage.getItem('serched') === null) {
            users = []
        }
        else {
            users = JSON.parse(localStorage.getItem('serched'))
        }
        return users
    }

    static addSearchedUserToStorage(userName) {
        //Kullanıcı ekle
        let users = this.getSearchedUsersFromStorage()

        //Indexof
        if (users.indexOf(userName) === -1) {
            users.push(userName)
        }

        localStorage.setItem('serched', JSON.stringify(users))
    }

    static clearAllSearchedUsersFromStorage() {
        //Tüm kullanıcıları sil
        localStorage.removeItem('serched')
    }
}