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
        var navigation = document.getElementById("feld");
        navigation.innerHTML = "<a onclick='showUserProfile()'>Profil</a>" +
                "<a onclick='logout()'>Logout</a>" +
                "<a onclick='myItems()'>My2Hand</a>" +
                "<a onclick='findItemsOfAllCustomers()'>Home</a>";
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

//Methode von Ann-Katrin
function logout() {
    var r = confirm("Wollen Sie sich wirklich ausloggen?");
    if (r === true) {
        deleteCookie();
    }
}