loggingCustomer = null;

function createNewCustomer() {
    
    var content = document.getElementById("content");
    content.innerHTML="<div id='formCustomers'>"+
                "<h1>Neu registrieren</h1>"+
                
                "<div id='bezeichner'"+
                    "<label>*Anrede</label>"+
                    "<br><br>"+
                    "<label>*Name</label>"+
                    "<br><br>"+
                    "<label>*Adresse</label>"+
                    "<br><br><br><br>"+
                    "<label>*IBAN</label>"+
                    "<br><br>"+
                    "<label>*BIC</label>"+
                    "<br><br>"+
                    "<label>*Bank</label>"+
                    "<br><br>"+
                    "<label>Telefonnummer</label>"+
                    "<br><br>"+
                    "<label>*E-Mail-Adresse</label>"+
                    "<br><br>"+
                    "<label>*Passwort</label>"+
                    "<br><br>"+
                    "<label>*Passwort wiederholen</label>"+
                    "<br><br>"+
                    "<input type='button' name='submit' value='Speichern' onClick='saveNewCustomer()'/>"+
                "</div>"+

                "<div id='felder'>"+
                    "<input type='radio' name='salutation' value='Frau' > Frau"+
                    "<input type='radio' name='salutation' value='Herr' > Herr"+
                    "<br><br>"+
                    "<input type='text' name='firstName' placeholder='Vorname'>"+
                    "<input type='text' name='lastName' placeholder='Nachname'>"+
                    "<br><br>"+
                    "<input type='text' name='street' placeholder='Straße'>"+
                    "<input type='text' name='houseNumber' placeholder='Hausnr.'>"+
                    "<br><br>"+
                    "<input type='text' name='plz' placeholder='PLZ'>"+
                    "<input type='text'name='place' placeholder='Ort'>"+
                    "<br><br>"+
                    "<input type='text' name='iban' placeholder='IBAN'>"+
                    "<br><br>"+
                    "<input type='text' name='bic' placeholder='BIC'>"+
                    "<br><br>"+
                    "<input type='text' name='bank' placeholder='Bank'>"+
                    "<br><br>"+
                    "<input type='text' name='telephone' placeholder='Telefonnummer'>"+
                    "<br><br>"+
                    "<input type='text' name='email' placeholder='E-Mail-Adresse'>"+
                    "<br><br>"+
                    "<input type='password' name='passworda' placeholder='Passwort'>"+
                    "<br><br>"+
                    "<input type='password' name='passwordb' placeholder='Passwort wiederholen'>"+
                    "<br><br>"+
                "</div>"+
                
            "</div>";
    }
    
    function saveNewCustomer(){
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
    
    if(firstName === "" || lastName === ""|| street === ""|| houseNumber === ""|| plz === ""|| place === ""|| iban === ""|| bic === ""|| bank === ""|| email === ""|| passworda === ""|| passwordb === ""){
        alert("Bitte füllen Sie alle Pflichtfelder aus!");
        return;
    }
    
    if(passworda !== passwordb){
        alert("Ihre Passwörter stimmen nicht überein!");
        return;
    }
    
    var ajax2 = new XMLHttpRequest();
    ajax2.open("POST", "CheckEmail");
    ajax2.responseType = "json";
    ajax2.addEventListener("load", function(){
        console.log(ajax2.response);
        if(ajax2.response.vorhanden){
            alert("Unter dieser E-Mailadress ist bereits ein Nutzer registriert!");
        }   return;
    });
    ajax2.send(JSON.stringify(
    {
        email: email
    }
    ));
           
    if (document.getElementsByName("salutation")[0].checked) {
        salutation = document.getElementsByName("salutation")[0].value;
    } else {
        salutation = document.getElementsByName("salutation")[1].value;
    }
    
    var ajax = new XMLHttpRequest();
    ajax.responseType = "json";
    ajax.open("POST", "servlet?action=createnewcustomer&salutation=" + encodeURI(salutation)
            + "&firstname=" + encodeURI(firstName) + "&lastname=" + encodeURI(lastName)
            + "&street=" + encodeURI(street) + "&housenumber=" + encodeURI(houseNumber)
            + "&plz=" + encodeURI(plz) + "&place=" + encodeURI(place)
            + "&iban=" + encodeURI(iban) + "&bic=" + encodeURI(bic) + "&bank=" + encodeURI(bank)
            + "&telephone=" + encodeURI(telephone) + "&email=" + encodeURI(email)
            + "&password=" + encodeURI(passworda), true);
    ajax.send();
   
    ajax.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            //document.getElementsByClassName("customers")[0].innerHTML = "Kunde erfolgreich angelegt.";
            alert("Kunde erfolgreich angelegt!");
        }
    };
    
    document.getElementsByName("firstName")[0].value="";
    document.getElementsByName("lastName")[0].value="";
    document.getElementsByName("street")[0].value="";
    document.getElementsByName("houseNumber")[0].value="";
    document.getElementsByName("plz")[0].value="";
    document.getElementsByName("place")[0].value="";
    document.getElementsByName("iban")[0].value="";
    document.getElementsByName("bic")[0].value="";
    document.getElementsByName("bank")[0].value="";
    document.getElementsByName("telephone")[0].value="";
    document.getElementsByName("email")[0].value="";
    document.getElementsByName("passworda")[0].value="";
    document.getElementsByName("passwordb")[0].value="";
}

function createNewItem() {
    var customerId = document.getElementsByName("customerId")[0].value;
    var locationId = document.getElementsByName("locationId")[0].value;
    var title = document.getElementsByName("title")[0].value;
    var category;
    var dressSize = document.getElementsByName("dressSize")[0].value;
    var price = document.getElementsByName("price")[0].value;
    var personType;
    var sold;
    var published;
    var ajax = new XMLHttpRequest();
    
    for (i=0; i<document.getElementsByName("category")[0].length; i++) {
        if(document.getElementsByName("category")[0].options[i].selected == true) {
            category = document.getElementsByName("category")[0].options[i].value;
        }
    }
    
    for (i=0; i<document.getElementsByName("personType")[0].length; i++) {
        if(document.getElementsByName("personType")[0].options[i].selected == true) {
            personType = document.getElementsByName("personType")[0].options[i].value;
        }
    }
    
    if (document.soldButtons.sold[0].checked = true) {
        sold = true;
    } else {
        sold = false;
    }
    
    if (document.publishedButtons.published[0].checked = true) {
        published = true;
    } else {
        published = false;
    }
    
    ajax.responseType = "json";
    ajax.open("POST", "servlet?action=createnewitem&customerid=" + encodeURI(customerId)
            + "&locationid=" + encodeURI(locationId) + "&title=" + encodeURI(title)
            + "&category=" + encodeURI(category) + "&dresssize=" + encodeURI(dressSize)
            + "&price=" + encodeURI(price) + "&persontype=" + encodeURI(personType)
            + "&sold=" + encodeURI(sold) + "&published=" + encodeURI(published), true);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementsByClassName("items")[0].innerHTML = "Kleidungsstück erfolgreich angelegt.";
        }
    };
    
    document.getElementsByName("customerId")[0].value="";
    document.getElementsByName("locationId")[0].value="";
    document.getElementsByName("title")[0].value="";
    document.getElementsByName("dressSize")[0].value="";
    document.getElementsByName("price")[0].value="";
}

function findAllCustomers() {
    var ajax = new XMLHttpRequest();
    
    ajax.responseType = "json";
    ajax.open("GET", "servlet?action=findallcustomers", true);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            for (i=0; i<this.response.length; i++) {
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

function findAllItems() {
    var customerId = document.getElementsByName("customerId")[1].value;
    var ajax = new XMLHttpRequest();
    
    ajax.responseType = "json";
    ajax.open("GET", "servlet?action=findallitems&customerid=" + customerId, true);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            for (i=0; i<this.response.items.length; i++) {
                var newHTML = "<div class='item' id='" + this.response.items[i].id + "'>"
                                + this.response.items[i].id
                                + this.response.items[i].customerId
                                + this.response.items[i].locationId
                                + this.response.items[i].title
                                + this.response.items[i].category
                                + this.response.items[i].dressSize
                                + this.response.items[i].price
                                + this.response.items[i].personType
                                + this.response.items[i].sold
                                + this.response.items[i].published
                                + "<p class='delete' id='" + this.response.items[i].id
                                    + "' onClick='deleteItem(" + this.response.items[i].id + ")'>löschen</p>"
                            + "</div>";
                document.getElementsByClassName("items")[0].innerHTML += newHTML;
            }
        }
    };
}

function deleteCustomer(id) {
    var result = confirm("Wollen Sie den Kunden wirklich löschen?");
    if (!result) return;
    
    var ajax = new XMLHttpRequest();
    
    ajax.responseType = "json";
    ajax.open("GET", "servlet?action=deletecustomer&customerid=" + id, true);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var parent = document.getElementsByClassName("customers")[0];
            var child = document.getElementById(id);
            parent.removeChild(child);
        }
    };
}

function deleteItem(id) {
    var result = confirm("Wollen Sie das Kleidungsstück wirklich löschen?");
    if (!result) return;
    
    var ajax = new XMLHttpRequest();
    
    ajax.responseType = "json";
    ajax.open("GET", "servlet?action=deleteitem&itemid=" + id, true);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var parent = document.getElementsByClassName("items")[0];
            var child = document.getElementById(id);
            parent.removeChild(child);
        }
    };
}

//Methode von Ann-Katrin
function login(){
    var content = document.getElementById("content");
    content.innerHTML="<div id='Login'>"+
                "<h1>Login</h1>"+
                "<p>E-Mail-Adresse:<br>"+
                "<input type='text' id='email' value=''>"+
                "</p>"+
                "<p>Passwort:<br>"+
                "<input type='password' id='pw' value=''>"+
                "</p>"+
                "<input type='button' name='submit' value='Login' onClick='login_check()'/>"+
                "<input type='button' name='submit' value='Jetzt registrieren' onClick='createNewCustomer()'/>"+
                "</div>";    
}

function login_check(){
    var mail = document.getElementById("email").value;
    var pw =  document.getElementById("pw").value;
    
    if(mail === "" || pw === ""){
        alert("Bitte füllen Sie alle Felder aus!");
    }
    else{
        var ajax = new XMLHttpRequest();
        ajax.open("POST", "CheckLogin");
        ajax.responseType = "json";
        ajax.addEventListener("load", function(){
            console.log(ajax.response);

        if(ajax.response.find){
            var navigation = document.getElementById("feld");
            navigation.innerHTML = "<a onclick='xxx()'>Profil</a>" +
                "<a onclick='logout()'>Logout</a>" +
                "<a onclick='xxx()'>My2Hand</a>"+
                "<a onclick='artikel()'>Home</a>";

            var welcome = document.getElementById("willkommen");
            welcome.innerHTML += ", " + ajax.response.vorname + " " + ajax.response.name + " KuNr: " + ajax.response.kunr;
            loggingCustomer = ajax.response.kunr;
        }
        else{
            alert("Ihre E-Mail-Adresse oder Ihr Passwort ist falsch!");
        }
    });
    ajax.send(JSON.stringify(
        {
            mail: mail,
            pw: pw
        }
    
    ));
    }
}

//Methode von Ann-Katrin
function logout(){
    var r = confirm("Wollen Sie sich wirklich ausloggen?");
    if(r === true){
        var navigation = document.getElementById("feld");
        navigation.innerHTML = "<a onclick='xxx()'>Profil</a>" +
                    "<a onclick='login()'>Login</a>" +
                    "<a onclick='xxx()'>My2Hand</a>"+
                    "<a onclick='artikel()'>Home</a>";
        loggingCustomer = null;
        
        var welcome = document.getElementById("willkommen");
        welcome.innerHTML = "Herzlich Willkommen";
    }
}
