function checkIfAdminIsLogged() {
    if (!sessionStorage.getItem('admin')) {
        let lastPart = window.location.href.split('/');
        lastPart = lastPart[lastPart.length - 1];
        window.location.replace(window.location.href.replace(lastPart, 'login_adm.html'))
    }
}
checkIfAdminIsLogged();