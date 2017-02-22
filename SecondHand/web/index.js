loggingCustomer = null;

function createNewCustomer() {
    var salutation;
    var firstName = document.getElementsByName("firstName")[0].value;
    var lastName = document.getElementsByName("lastName")[0].value;
    var street = document.getElementsByName("street")[0].value;
    var houseNumber = document.getElementsByName("houseNumber")[0].value;
    var plz = document.getElementsByName("plz")[0].value;
    var place = document.getElementsByName("place")[0].value;
    var telephone = document.getElementsByName("telephone")[0].value;
    var email = document.getElementsByName("email")[0].value;
    var password = document.getElementsByName("password")[0].value;
    var ajax = new XMLHttpRequest();
    
    if (document.getElementsByName("salutation")[0].checked) {
        salutation = document.getElementsByName("salutation")[0].value;
    } else {
        salutation = document.getElementsByName("salutation")[1].value;
    }
    
    ajax.responseType = "json";
    ajax.open("POST", "servlet?action=createnewcustomer&salutation=" + encodeURI(salutation)
            + "&firstname=" + encodeURI(firstName) + "&lastname=" + encodeURI(lastName)
            + "&street=" + encodeURI(street) + "&housenumber=" + encodeURI(houseNumber)
            + "&plz=" + encodeURI(plz) + "&place=" + encodeURI(place)
            + "&telephone=" + encodeURI(telephone) + "&email=" + encodeURI(email)
            + "&password=" + encodeURI(password), true);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementsByClassName("customers")[0].innerHTML = "Kunde erfolgreich angelegt.";
        }
    };
    
    document.getElementsByName("firstName")[0].value="";
    document.getElementsByName("lastName")[0].value="";
    document.getElementsByName("street")[0].value="";
    document.getElementsByName("houseNumber")[0].value="";
    document.getElementsByName("plz")[0].value="";
    document.getElementsByName("place")[0].value="";
    document.getElementsByName("telephone")[0].value="";
    document.getElementsByName("email")[0].value="";
    document.getElementsByName("password")[0].value="";
    document.getElementsByName("password")[1].value="";
}

function createNewItem() {
    var customerId = document.getElementsByName("customerId")[0].value;
    var category;
    var brand = document.getElementsByName("brand")[0].value;
    var dressSize = document.getElementsByName("dressSize")[0].value;
    var price = document.getElementsByName("price")[0].value;
    var ajax = new XMLHttpRequest();
    
    for (i=0; i<document.getElementsByName("category")[0].length; i++) {
        if(document.getElementsByName("category")[0].options[i].selected == true) {
            category = document.getElementsByName("category")[0].options[i].value;
        }
    }
    
    ajax.responseType = "json";
    ajax.open("POST", "servlet?action=createnewitem&customerid=" + encodeURI(customerId)
            + "&category=" + encodeURI(category) + "&brand=" + encodeURI(brand)
            + "&dresssize=" + encodeURI(dressSize) + "&price=" + encodeURI(price), true);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementsByClassName("items")[0].innerHTML = "Kleidungsstück erfolgreich angelegt.";
        }
    };
    
    document.getElementsByName("customerId")[0].value="";
    document.getElementsByName("category")[0].value="";
    document.getElementsByName("brand")[0].value="";
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
                                + this.response[i].telephone
                                + this.response[i].email
                                + this.response[i].password
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
    ajax.open("GET", "Servlet?action=findallitems&customerid=" + customerId, true);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            for (i=0; i<this.response.items.length; i++) {
                var newHTML = "<div class='item' id='" + this.response.items[i].id + "'>"
                                + this.response.items[i].id
                                + this.response.items[i].customerId
                                + this.response.items[i].category
                                + this.response.items[i].brand
                                + this.response.items[i].dressSize
                                + this.response.items[i].price
                            + "</div>";
                document.getElementsByClassName("items")[0].innerHTML += newHTML;
            }
        }
    };
}

//Methode von Ann-Katrin
function login(){
    loggingCustomer = Math.random();
    
    var navigation = document.getElementById("feld");
    navigation.innerHTML = "<a onclick='xxx()'>Profil</a>" +
            "<a onclick='logout()'>Logout</a>" +
            "<a onclick='xxx()'>My2Hand</a>"+
            "<a onclick='artikel()'>Home</a>";
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
                "<input type='button' name='submit' value='Jetzt registrieren' onClick='registrieren()'/>"+
                "</div>";    
    var welcome = document.getElementById("willkommen");
    welcome.innerHTML += ", " + loggingCustomer; 
}

function login_check(){
    
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

function registrieren(){
     var content = document.getElementById("content");
    content.innerHTML="<div id='formCustomers'>"+
                "<h1>Kunde anlegen</h1>"+
                "<p>Vorname:<br>"+
                "<input type='text' id='firstName' value=''>"+
                "</p>"+
                "<p>Nachname:<br>"+
                "<input type='text' id='lastName' value=''>"+
                "</p>"+
                "<p>Adresse:<br>"+
                "<input type='text' id='address' value=''>"+
                "</p>"+
                "<p>Telefonnummer:<br>"+
                "<input type='text' id='telephone' value=''>"+
                "</p>"+
                "<p>E-Mail-Adresse:<br>"+
                "<input type='text' id='email' value=''>"+
                "</p>"+
                "<p>Passwort:<br>"+
                "<input type='password' id='pw1' value=''>"+
                "</p>"+
                "<p>Passwort wiederholen:<br>"+
                "<input type='password' id='pw2' value=''>"+
                "</p>"+
                "<input type='button' name='submit' value='Speichern' onClick='createNewCustomer()'/>"+
                "</div>";
}
