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
                        + "' onClick='deleteCustomer()'>löschen</p>"
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
    var email = document.getElementsByName("signUpEmail")[0].value;
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
        document.getElementsByClassName("modal-header")[1].innerHTML =
                "<button type='button' class='close' data-dismiss='modal'>&times;</button>"
                + "<h4 class='modal-title'>Neu registrieren</h4>"
                + "<br><div class='alert alert-danger'>Bitte füllen Sie alle Pflichtfelder aus!</div>";
        return;
    }

    if (passworda !== passwordb) {
        document.getElementsByClassName("modal-header")[1].innerHTML =
                "<button type='button' class='close' data-dismiss='modal'>&times;</button>"
                + "<h4 class='modal-title'>Neu registrieren</h4>"
                + "<br><div class='alert alert-danger'>Ihre Passwörter stimmen nicht überein!</div>";
        return;
    }

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "CheckEmail?action=createnewcustomer");
    ajax.responseType = "json";
    ajax.addEventListener("load", function () {
        console.log(ajax.response);
        if (ajax.response.vorhanden) {
            document.getElementsByClassName("modal-header")[1].innerHTML =
                    "<button type='button' class='close' data-dismiss='modal'>&times;</button>"
                    + "<h4 class='modal-title'>Neu registrieren</h4>"
                    + "<br><div class='alert alert-danger'>Unter dieser E-Mail-Adresse ist bereits ein Nutzer registriert!</div>";
        } else {
            document.getElementsByClassName("modal-header")[1].innerHTML =
                    "<button type='button' class='close' data-dismiss='modal'>&times;</button>"
                    + "<h4 class='modal-title'>Neu registrieren</h4>"
                    + "<br><div class='alert alert-success'>Ihr Kundenkonto wurde erfolgreich angelegt!</div>";
            document.getElementsByName("salutation")[0].checked = false;
            document.getElementsByName("salutation")[1].checked = false;
            document.getElementsByName("firstName")[0].value = "";
            document.getElementsByName("lastName")[0].value = "";
            document.getElementsByName("street")[0].value = "";
            document.getElementsByName("houseNumber")[0].value = "";
            document.getElementsByName("plz")[0].value = "";
            document.getElementsByName("place")[0].value = "";
            document.getElementsByName("iban")[0].value = "";
            document.getElementsByName("bic")[0].value = "";
            document.getElementsByName("bank")[0].value = "";
            document.getElementsByName("telephone")[0].value = "";
            document.getElementsByName("signUpEmail")[0].value = "";
            document.getElementsByName("passworda")[0].value = "";
            document.getElementsByName("passwordb")[0].value = "";
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
    var ajax = new XMLHttpRequest();

    ajax.responseType = "json";
    ajax.open("GET", "servlet?action=findallitems&customerid=" + getCookie(), true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementsByClassName("row")[1].innerHTML = "<div class='col-sm-12 profile'></div>";
            document.getElementsByClassName("row")[2].innerHTML = "<div class='col-sm-4 profile'></div><div class='col-sm-4 profile'></div><div class='col-sm-4 profile'></div>";
            document.getElementsByClassName("row")[3].innerHTML = "";
            console.log(this.response);
            document.getElementsByClassName("col-sm-12")[0].innerHTML =
                    "<h2>Mein Profil <span class='editProfile glyphicon glyphicon-edit' onClick='updateProfile()' data-toggle='modal' data-target='#signUp' title='Profil bearbeiten'></span>"
                    + "<span class='editProfile glyphicon glyphicon-trash' onClick='deleteCustomer()' title='Profil löschen'></span></h2>";
            document.getElementsByClassName("col-sm-4")[0].innerHTML =
                    "<h3>Name und Anschrift</h3>"
                    + "<p>" + this.response.salutation + " " + this.response.firstName + " " + this.response.lastName + "</p>"
                    + "<p>" + this.response.street + " " + this.response.houseNumber + "</p>"
                    + "<p>" + this.response.plz + " " + this.response.place + "</p>";
            document.getElementsByClassName("col-sm-4")[1].innerHTML =
                    "<h3>Bankverbindung</h3>"
                    + "<p>IBAN: " + this.response.iban + "</p>"
                    + "<p>BIC: " + this.response.bic + "</p>"
                    + "<p>Bankname: " + this.response.bank + "</p>";
            document.getElementsByClassName("col-sm-4")[2].innerHTML =
                    "<h3>Kontaktdaten</h3>"
                    + "<p>Telefon: " + this.response.telephone + "</p>"
                    + "<p>E-Mail: " + this.response.email + "</p>";
        }
    };
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

            document.getElementsByClassName("modal-title")[1].innerHTML = "Profil bearbeiten";
            document.getElementsByClassName("modal-signUp")[0].innerHTML =
                    "<label class='signUpLabel'><b>Anrede*</b></label>"
                    + "<div class='signUpRadio'>"
                    + salutation
                    + "</div>"
                    + "<br>"
                    + "<label class='signUpLabel'><b>Vorname*</b></label>"
                    + "<input class='signUpInput' type='text' value='" + this.response.firstName + "' name='firstName' required>"
                    + "<label class='signUpLabel'><b>Nachname*</b></label>"
                    + "<input class='signUpInput' type='text' value='" + this.response.lastName + "' name='lastName' required>"
                    + "<br>"
                    + "<label class='signUpLabel'><b>Straße*</b></label>"
                    + "<input class='signUpInput' type='text' value='" + this.response.street + "' name='street' required>"
                    + "<label class='signUpLabel'><b>Hausnummer*</b></label>"
                    + "<input class='signUpInput' type='text' value='" + this.response.houseNumber + "' name='houseNumber' required>"
                    + "<br>"
                    + "<label class='signUpLabel'><b>PLZ*</b></label>"
                    + "<input class='signUpInput' type='text' value='" + this.response.plz + "' name='plz' required>"
                    + "<label class='signUpLabel'><b>Ort*</b></label>"
                    + "<input class='signUpInput' type='text' value='" + this.response.place + "' name='place' required>"
                    + "<br>"
                    + "<label class='signUpLabel'><b>IBAN*</b></label>"
                    + "<input class='signUpInput' type='text' value='" + this.response.iban + "' name='iban' required>"
                    + "<label class='signUpLabel'><b>BIC*</b></label>"
                    + "<input class='signUpInput' type='text' value='" + this.response.bic + "' name='bic' required>"
                    + "<br>"
                    + "<label class='signUpLabel'><b>Bank*</b></label>"
                    + "<input class='signUpInput' type='text' value='" + this.response.bank + "' name='bank' required>"
                    + "<br>"
                    + "<label class='signUpLabel'><b>Telefonnummer</b></label>"
                    + "<input class='signUpInput' type='text' value='" + this.response.telephone + "' name='telephone'>"
                    + "<label class='signUpLabel'><b>E-Mail-Adresse*</b></label>"
                    + "<input class='signUpInput' type='text' value='" + this.response.email + "' name='signUpEmail' required>"
                    + "<br>"
                    + "<label class='signUpLabel'><b>Passwort*</b></label>"
                    + "<input class='signUpInput' type='password' placeholder='Passwort eingeben' name='passworda' required>"
                    + "<label class='signUpLabel'><b>Passwort wiederholen*</b></label>"
                    + "<input class='signUpInput' type='password' placeholder='Passwort wiederholen' name='passwordb' required>"
                    + "<button class='loginButton' type='submit' onClick='saveUpdates()'>Profil aktualisieren</button>";
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
    var email = document.getElementsByName("signUpEmail")[0].value;
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
        document.getElementsByClassName("modal-header")[1].innerHTML =
                "<button type='button' class='close' data-dismiss='modal'>&times;</button>"
                + "<h4 class='modal-title'>Profil bearbeiten</h4>"
                + "<br><div class='alert alert-danger'>Bitte füllen Sie alle Pflichtfelder aus!</div>";
        return;
    }

    if (passworda !== passwordb) {
        document.getElementsByClassName("modal-header")[1].innerHTML =
                "<button type='button' class='close' data-dismiss='modal'>&times;</button>"
                + "<h4 class='modal-title'>Profil bearbeiten</h4>"
                + "<br><div class='alert alert-danger'>Ihre Passwörter stimmen nicht überein!</div>";
        return;
    }

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "CheckEmail?action=updateprofile");
    ajax.responseType = "json";
    ajax.addEventListener("load", function () {
        console.log(ajax.response);
        if (ajax.response.vorhanden) {
            document.getElementsByClassName("modal-header")[1].innerHTML =
                    "<button type='button' class='close' data-dismiss='modal'>&times;</button>"
                    + "<h4 class='modal-title'>Profil bearbeiten</h4>"
                    + "<br><div class='alert alert-danger'>Unter dieser E-Mail-Adresse ist bereits ein Nutzer registriert!</div>";
            return;
        } else {
            document.getElementsByClassName("modal-header")[1].innerHTML =
                    "<button type='button' class='close' data-dismiss='modal'>&times;</button>"
                    + "<h4 class='modal-title'>Profil bearbeiten</h4>"
                    + "<br><div class='alert alert-success'>Ihr Profil wurde erfolgreich aktualisiert!</div>";
            showUserProfile()
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

function deleteCustomer() {
    var result = confirm("Wollen Sie den Kunden wirklich löschen?");
    if (!result)
        return;

    var ajax = new XMLHttpRequest();

    ajax.responseType = "json";
    ajax.open("GET", "servlet?action=deletecustomer&customerid=" + getCookie(), true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            deleteCookie();
            findItemsOfAllCustomers();
        }
    };
}