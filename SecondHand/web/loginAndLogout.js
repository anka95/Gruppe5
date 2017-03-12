function loginNeu() {
    var email = document.getElementsByName("email")[0].value;
    var pw = document.getElementsByName("password")[0].value;
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "CheckLogin");
    ajax.responseType = "json";
    ajax.addEventListener("load", function () {
        console.log(ajax.response);
        if (ajax.response.find) {
            setCookie(ajax.response.kunr);
            myItems();
            $('#login').modal('hide');
            isLoggedIn();
        } else {
            document.getElementsByClassName("modal-header")[0].innerHTML +=
                    "<br><div class='alert alert-danger'>Ihre E-Mail-Adresse oder Ihr Passwort ist falsch!</div>";
        }
    });
    ajax.send(JSON.stringify(
            {
                email: email,
                pw: pw
            }
    ));
}

//Methode von Ann-Katrin
function login() {
    if (document.getElementById("selection")) {
        var parent = document.getElementById("other");
        var child = document.getElementById("selection");
        parent.removeChild(child);
    }

    var content = document.getElementById("content");
    content.innerHTML = "<div id='Login'>" +
            "<h1>Login</h1>" +
            "<p>E-Mail-Adresse:<br>" +
            "<input type='text' id='email' value=''>" +
            "</p>" +
            "<p>Passwort:<br>" +
            "<input type='password' id='pw' value=''>" +
            "</p>" +
            "<input type='button' name='submit' value='Login' onClick='login_check()'/>" +
            "<input type='button' name='submit' value='Jetzt registrieren' onClick='createNewCustomer()'/>" +
            "</div>";
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

//Methode von Ann-Katrin
function login_check() {
    var email = document.getElementById("email").value;
    var pw = document.getElementById("pw").value;
    if (email === "" || pw === "") {
        alert("Bitte füllen Sie alle Felder aus!");
    } else {
        var ajax = new XMLHttpRequest();
        ajax.open("POST", "CheckLogin");
        ajax.responseType = "json";
        ajax.addEventListener("load", function () {
            console.log(ajax.response);
            if (ajax.response.find) {
                setCookie(ajax.response.kunr);
                myItems();
                var navigation = document.getElementById("feld");
                navigation.innerHTML = "<a onclick='showUserProfile()'>Profil</a>" +
                        "<a onclick='logout()'>Logout</a>" +
                        "<a onclick='myItems()'>My2Hand</a>" +
                        "<a onclick='findItemsOfAllCustomers()'>Home</a>";
                var welcome = document.getElementById("willkommen");
                welcome.innerHTML += ", " + ajax.response.vorname + " " + ajax.response.name + " KuNr: " + ajax.response.kunr;
            } else {
                alert("Ihre E-Mail-Adresse oder Ihr Passwort ist falsch!");
            }
        });
        ajax.send(JSON.stringify(
                {
                    email: email,
                    pw: pw
                }

        ));
    }
}

function logout() {
    deleteCookie();
}