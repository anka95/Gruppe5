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
                setCookie(ajax.response.kdnr);
                myItems();
                $('#login').modal('hide');
                isLoggedIn();
            } else {
                document.getElementsByClassName("modal-header")[0].innerHTML +=
                        "<br><div class='alert alert-danger'>Ihre E-Mail-Adresse oder Ihr Passwort ist falsch!</div>";
            }
        }
    };
}

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
    }
}

function logout() {
    deleteCookie();
}