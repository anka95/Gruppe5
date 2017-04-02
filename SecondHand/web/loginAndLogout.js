/**
 * @file Alle Funktion für den Login und Logout.
 */

/**
 * @function login
 * @description Meldet den Kunden an.
 */
function login() {
    var email = document.getElementsByName("email")[0].value;
    var pw = document.getElementsByName("password")[0].value;
    var ajax = new XMLHttpRequest();

    ajax.responseType = "json";
    ajax.open("POST", "CheckLogin?email=" + email + "&pw=" + pw, true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(ajax.response);
            if (ajax.response.find) {
                setCookie(ajax.response.customerId);
                myItems();
                $('#login').modal('hide');
                isLoggedIn();
            } else {
                document.getElementsByClassName("modal-header")[0].innerHTML =
                        "<button type='button' class='close' data-dismiss='modal'>&times;</button>"
                        + "<h4 class='modal-title'>Login</h4>"
                        + "<br><div class='alert alert-danger'>Ihre E-Mail-Adresse oder Ihr Passwort ist falsch!</div>";
            }
        }
    };
    return true;
}

/**
 * @function isLoggedIn
 * @description Überprüft, ob der Kunde angemeldet ist.
 */
function isLoggedIn() {
    if (document.cookie) {
        var parent = document.getElementsByClassName("navbar-right")[0];
        var child = document.getElementsByClassName("navbar-right")[0].getElementsByTagName("li")[1];
        parent.removeChild(child);
        parent.innerHTML +=
                "<li class='dropdown'>"
                + "<a class='dropdown-toggle' data-toggle='dropdown' href='#'>Mein Konto <span class='caret'></span></a>"
                + "<ul class='dropdown-menu'>"
                + "<li><a href='javascript:void(0)' onclick='myItems()'>My2Hand</a></li>"
                + "<li><a href='javascript:void(0)' onclick='showUserProfile()'>Profil</a></li>"
                + "<li><a href='javascript:void(0)' onclick='logout()'><span class='glyphicon glyphicon-log-out'></span> Logout</a></li>"
                + "</ul>"
                + "</li>";
        return 'loggedIn';
    }
    return 'loggedOut';
}

/**
 * @function logout
 * @description Meldet den Kunden ab.
 */
function logout() {
    deleteCookie();
}