function findAllCustomers() {
    var ajax = new XMLHttpRequest();

    ajax.responseType = "json";
    ajax.open("GET", "servlet?action=findallcustomers", true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            for (i = 0; i < this.response.length; i++) {
                var newHTML = "<div class='customer' id='" + this.response[i].customerId + "'>"
                        + this.response[i].salutation
                        + this.response[i].firstName
                        + this.response[i].lastName
                        + this.response[i].street
                        + this.response[i].houseNumber
                        + this.response[i].plz
                        + this.response[i].place
                        + this.response[i].iban
                        + this.response[i].bic
                        + this.response[i].bank
                        + this.response[i].telephone
                        + this.response[i].email
                        + this.response[i].password
                        + "<p class='delete' id='" + this.response[i].customerId
                        + "' onClick='deleteCustomer(" + this.response[i].customerId + ")'>löschen</p>"
                        + "</div>";
                document.getElementsByClassName("customers")[0].innerHTML += newHTML;
            }
        }
    };
}

function createNewCustomer() {
    var content = document.getElementById("content");
    content.innerHTML = "<div id='formCustomers'>" +
            "<h1>Neu registrieren</h1>" +
            "<div id='bezeichner'" +
            "<label>*Anrede</label>" +
            "<br>" +
            "<input type='radio' name='salutation' value='Frau' > Frau" +
            "<input type='radio' name='salutation' value='Herr' > Herr" +
            "<br><br>" +
            "<label>*Name</label>" +
            "<br>" +
            "<input type='text' name='firstName' placeholder='Vorname'>" +
            "<input type='text' name='lastName' placeholder='Nachname'>" +
            "<br><br>" +
            "<label>*Adresse</label>" +
            "<br>" +
            "<input type='text' name='street' placeholder='Straße'>" +
            "<input type='text' name='houseNumber' placeholder='Hausnummer'>" +
            "<br>" +
            "<input type='text' name='plz' placeholder='PLZ'>" +
            "<input type='text'name='place' placeholder='Ort'>" +
            "<br><br>" +
            "<label>*IBAN</label>" +
            "<br>" +
            "<input type='text' name='iban' placeholder='IBAN'>" +
            "<br><br>" +
            "<label>*BIC</label>" +
            "<br>" +
            "<input type='text' name='bic' placeholder='BIC'>" +
            "<br><br>" +
            "<label>*Bank</label>" +
            "<br>" +
            "<input type='text' name='bank' placeholder='Bank'>" +
            "<br><br>" +
            "<label>Telefonnummer</label>" +
            "<br>" +
            "<input type='text' name='telephone' placeholder='Telefonnummer'>" +
            "<br><br>" +
            "<label>*E-Mail-Adresse</label>" +
            "<br>" +
            "<input type='text' name='email' placeholder='E-Mail-Adresse'>" +
            "<br><br>" +
            "<label>*Passwort</label>" +
            "<br>" +
            "<input type='password' name='passworda' placeholder='Passwort'>" +
            "<br><br>" +
            "<label>*Passwort wiederholen</label>" +
            "<br>" +
            "<input type='password' name='passwordb' placeholder='Passwort wiederholen'>" +
            "<br><br>" +
            "<input type='button' name='submit' value='Speichern' onClick='saveNewCustomer()'/>" +
            "</div>" +
            "</div>";
}

function saveNewCustomer() {
    var salutation;
    var firstName = document.getElementsByName("firstName")[0].value;
    var lastName = document.getElementsByName("lastName")[0].value;
    var street = document.getElementsByName("street")[0].value;
    var houseNumber = document.getElementsByName("houseNumber")[0].value;
    var plz = document.getElementsByName("plz")[0].value;
    var place = document.getElementsByName("place")[0].value;
    var iban = document.getElementsByName("iban")[0].value;
    var bic = document.getElementsByName("bic")[0].value;
    var bank = document.getElementsByName("bank")[0].value;
    var telephone = document.getElementsByName("telephone")[0].value;
    var email = document.getElementsByName("email")[0].value;
    var passworda = document.getElementsByName("passworda")[0].value;
    var passwordb = document.getElementsByName("passwordb")[0].value;

    if (document.getElementsByName("salutation")[0].checked) {
        salutation = document.getElementsByName("salutation")[0].value;
    } else {
        salutation = document.getElementsByName("salutation")[1].value;
    }

    if (firstName === "" || lastName === "" || street === "" || houseNumber === ""
            || plz === "" || place === "" || iban === "" || bic === "" || bank === ""
            || email === "" || passworda === "" || passwordb === "") {
        alert("Bitte füllen Sie alle Pflichtfelder aus!");
        return;
    }

    if (passworda !== passwordb) {
        alert("Ihre Passwörter stimmen nicht überein!");
        return;
    }

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "CheckEmail?action=createnewcustomer");
    ajax.responseType = "json";
    ajax.addEventListener("load", function () {
        console.log(ajax.response);
        if (ajax.response.vorhanden) {
            alert("Unter dieser E-Mail-Adresse ist bereits ein Nutzer registriert!");
        } else {
            alert("Ihr Kundenkonto wurde erfolgreich angelegt!");
            login();
        }

    });

    ajax.send(JSON.stringify(
            {
                salutation: salutation,
                firstName: firstName,
                lastName: lastName,
                street: street,
                houseNumber: houseNumber,
                plz: plz,
                place: place,
                iban: iban,
                bic: bic,
                bank: bank,
                telephone: telephone,
                email: email,
                password: passworda
            }
    ));
}

function showUserProfile() {
    if (document.getElementById("selection")) {
        var parent = document.getElementById("other");
        var child = document.getElementById("selection");
        parent.removeChild(child);
    }

    var content = document.getElementById("content");

    if (document.cookie) {
        var ajax = new XMLHttpRequest();

        ajax.responseType = "json";
        ajax.open("GET", "servlet?action=findallitems&customerid=" + getCookie(), true);
        ajax.send();
        ajax.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                content.innerHTML = "<div class='profile'>"
                        + "<h1>Mein Profil</h1>"
                        + "<input type='button' name='submit' value='Profil bearbeiten' onClick='updateProfile()'/>"
                        + "<h2>Name und Anschrift</h2>"
                        + "<p>" + this.response.salutation + " " + this.response.firstName + " " + this.response.lastName + "</p>"
                        + "<p>" + this.response.street + " " + this.response.houseNumber + "</p>"
                        + "<p>" + this.response.plz + " " + this.response.place + "</p>"
                        + "<br>"
                        + "<h2>Bankverbindung</h2>"
                        + "<p>IBAN: " + this.response.iban + "</p>"
                        + "<p>BIC: " + this.response.bic + "</p>"
                        + "<p>Bankname: " + this.response.bank + "</p>"
                        + "<br>"
                        + "<h2>Kontaktdaten</h2>"
                        + "<p>Telefon: " + this.response.telephone + "</p>"
                        + "<p>E-Mail: " + this.response.email + "</p>"
                        + "<input type='button' name='submit' value='Profil löschen' onClick='deleteCustomer(" + getCookie() + ")'/>"
                        + "</div>";
            }
        };
    } else {
        content.innerHTML = "<h1>Bitte loggen Sie sich ein, damit Sie Ihr Profil sehen können!</h1>";
    }
}

function updateProfile() {
    var ajax = new XMLHttpRequest();

    ajax.responseType = "json";
    ajax.open("GET", "servlet?action=findallitems&customerid=" + getCookie(), true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var salutation;
            if (this.response.salutation === "Frau") {
                salutation = "<input type='radio' name='salutation' value='Frau' checked> Frau" +
                        "<input type='radio' name='salutation' value='Herr' > Herr";
            } else {
                salutation = "<input type='radio' name='salutation' value='Frau'> Frau" +
                        "<input type='radio' name='salutation' value='Herr' checked> Herr";
            }

            var content = document.getElementById("content");
            content.innerHTML = "<div id='updateProfile'>" +
                    "<h1>Profil bearbeiten</h1>" +
                    "<div id='bezeichner'" +
                    "<label>*Anrede</label>" +
                    "<br>" +
                    salutation +
                    "<br><br>" +
                    "<label>*Name</label>" +
                    "<br>" +
                    "<input type='text' name='firstName' value='" + this.response.firstName + "'>" +
                    "<input type='text' name='lastName' value='" + this.response.lastName + "'>" +
                    "<br><br>" +
                    "<label>*Adresse</label>" +
                    "<br>" +
                    "<input type='text' name='street' value='" + this.response.street + "'>" +
                    "<input type='text' name='houseNumber' value='" + this.response.houseNumber + "'>" +
                    "<br>" +
                    "<input type='text' name='plz' value='" + this.response.plz + "'>" +
                    "<input type='text'name='place' value='" + this.response.place + "'>" +
                    "<br><br>" +
                    "<label>*IBAN</label>" +
                    "<br>" +
                    "<input type='text' name='iban' value='" + this.response.iban + "'>" +
                    "<br><br>" +
                    "<label>*BIC</label>" +
                    "<br>" +
                    "<input type='text' name='bic' value='" + this.response.bic + "'>" +
                    "<br><br>" +
                    "<label>*Bank</label>" +
                    "<br>" +
                    "<input type='text' name='bank' value='" + this.response.bank + "'>" +
                    "<br><br>" +
                    "<label>Telefonnummer</label>" +
                    "<br>" +
                    "<input type='text' name='telephone' value='" + this.response.telephone + "'>" +
                    "<br><br>" +
                    "<label>*E-Mail-Adresse</label>" +
                    "<br>" +
                    "<input type='text' name='email' value='" + this.response.email + "'>" +
                    "<br><br>" +
                    "<label>*Passwort</label>" +
                    "<br>" +
                    "<input type='password' name='passworda' value='" + this.response.password + "'>" +
                    "<br><br>" +
                    "<label>*Passwort wiederholen</label>" +
                    "<br>" +
                    "<input type='password' name='passwordb' placeholder='Passwort wiederholen'>" +
                    "<br><br>" +
                    "<input type='button' name='submit' value='Speichern' onClick='saveUpdates()'/>" +
                    "</div>" +
                    "</div>";
        }
    };
}

function saveUpdates() {
    var salutation;
    var firstName = document.getElementsByName("firstName")[0].value;
    var lastName = document.getElementsByName("lastName")[0].value;
    var street = document.getElementsByName("street")[0].value;
    var houseNumber = document.getElementsByName("houseNumber")[0].value;
    var plz = document.getElementsByName("plz")[0].value;
    var place = document.getElementsByName("place")[0].value;
    var iban = document.getElementsByName("iban")[0].value;
    var bic = document.getElementsByName("bic")[0].value;
    var bank = document.getElementsByName("bank")[0].value;
    var telephone = document.getElementsByName("telephone")[0].value;
    var email = document.getElementsByName("email")[0].value;
    var passworda = document.getElementsByName("passworda")[0].value;
    var passwordb = document.getElementsByName("passwordb")[0].value;

    if (document.getElementsByName("salutation")[0].checked) {
        salutation = document.getElementsByName("salutation")[0].value;
    } else {
        salutation = document.getElementsByName("salutation")[1].value;
    }

    if (firstName === "" || lastName === "" || street === "" || houseNumber === ""
            || plz === "" || place === "" || iban === "" || bic === "" || bank === ""
            || email === "" || passworda === "" || passwordb === "") {
        alert("Bitte füllen Sie alle Pflichtfelder aus!");
        return;
    }

    if (passworda !== passwordb) {
        alert("Ihre Passwörter stimmen nicht überein!");
        return;
    }

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "CheckEmail?action=updateprofile");
    ajax.responseType = "json";
    ajax.addEventListener("load", function () {
        console.log(ajax.response);
        if (ajax.response.vorhanden) {
            alert("Unter dieser E-Mail-Adresse ist bereits ein Nutzer registriert!");
        } else {
            alert("Ihr Kundenkonto wurde erfolgreich aktualisiert!");
            showUserProfile();
        }

    });

    ajax.send(JSON.stringify(
            {
                customerId: getCookie(),
                salutation: salutation,
                firstName: firstName,
                lastName: lastName,
                street: street,
                houseNumber: houseNumber,
                plz: plz,
                place: place,
                iban: iban,
                bic: bic,
                bank: bank,
                telephone: telephone,
                email: email,
                password: passworda
            }
    ));
}

function deleteCustomer(id) {
    var result = confirm("Wollen Sie den Kunden wirklich löschen?");
    if (!result)
        return;

    var ajax = new XMLHttpRequest();

    ajax.responseType = "json";
    ajax.open("GET", "servlet?action=deletecustomer&customerid=" + id, true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            deleteCookie();
            findItemsOfAllCustomers();
        }
    };
}