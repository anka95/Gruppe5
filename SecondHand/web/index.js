loggingCustomer = null;

function createNewCustomer() {
    
    var content = document.getElementById("content");
    content.innerHTML="<div id='formCustomers'>"+
                "<h1>Neu registrieren</h1>"+
                
                "<div id='bezeichner'"+
                    "<label>*Anrede</label>"+
                    "<br>"+
                    "<input type='radio' name='salutation' value='Frau' > Frau"+
                    "<input type='radio' name='salutation' value='Herr' > Herr"+
                    "<br><br>"+
                    "<label>*Name</label>"+
                    "<br>"+
                    "<input type='text' name='firstName' placeholder='Vorname'>"+
                    "<input type='text' name='lastName' placeholder='Nachname'>"+
                    "<br><br>"+
                    "<label>*Adresse</label>"+
                    "<br>"+
                    "<input type='text' name='street' placeholder='Straße'>"+
                    "<input type='text' name='houseNumber' placeholder='Hausnummer'>"+
                    "<br>"+
                    "<input type='text' name='plz' placeholder='PLZ'>"+
                    "<input type='text'name='place' placeholder='Ort'>"+
                    "<br><br>"+
                    "<label>*IBAN</label>"+
                    "<br>"+
                    "<input type='text' name='iban' placeholder='IBAN'>"+
                    "<br><br>"+
                    "<label>*BIC</label>"+
                    "<br>"+
                    "<input type='text' name='bic' placeholder='BIC'>"+
                    "<br><br>"+
                    "<label>*Bank</label>"+
                    "<br>"+
                    "<input type='text' name='bank' placeholder='Bank'>"+
                    "<br><br>"+
                    "<label>Telefonnummer</label>"+
                    "<br>"+
                     "<input type='text' name='telephone' placeholder='Telefonnummer'>"+
                    "<br><br>"+
                    "<label>*E-Mail-Adresse</label>"+
                    "<br>"+
                    "<input type='text' name='email' placeholder='E-Mail-Adresse'>"+
                    "<br><br>"+
                    "<label>*Passwort</label>"+
                    "<br>"+
                    "<input type='password' name='passworda' placeholder='Passwort'>"+
                    "<br><br>"+
                    "<label>*Passwort wiederholen</label>"+
                    "<br>"+
                    "<input type='password' name='passwordb' placeholder='Passwort wiederholen'>"+
                    "<br><br>"+
                    "<input type='button' name='submit' value='Speichern' onClick='saveNewCustomer()'/>"+
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
    
    if (document.getElementsByName("salutation")[0].checked) {
        salutation = document.getElementsByName("salutation")[0].value;
    } else {
        salutation = document.getElementsByName("salutation")[1].value;
    }
    
    if(firstName === "" || lastName === ""|| street === ""|| houseNumber === ""|| plz === ""|| place === ""|| iban === ""|| bic === ""|| bank === ""|| email === ""|| passworda === ""|| passwordb === ""){
        alert("Bitte füllen Sie alle Pflichtfelder aus!");
        return;
    }
    
    if(passworda !== passwordb){
        alert("Ihre Passwörter stimmen nicht überein!");
        return;
    }
    
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "CheckEmail");
    ajax.responseType = "json";
    ajax.addEventListener("load", function(){
        console.log(ajax.response);
        if(ajax.response.vorhanden){
            alert("Unter dieser E-Mail-Adresse ist bereits ein Nutzer registriert!");
        } 
        else{
            alert("Ihr Kundenkonto wurde erfolgreich angelegt!");
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

function createNewItem(customerId) {
    var content = document.getElementById("content");
        content.innerHTML="<div id=''>"+
                "<h1>Kleidungsstück verkaufen</h1>"+
            "<div id='formItems'>"+
                "<label>Standort*:</label>"+
                "<br>"+
                "<select name='locationPlace'>"+
                        "<option>-Bitte auswählen-</option>"+
                        "<option>Karlsruhe</option>"+
                        "<option>Berlin</option>"+
                        "<option>München</option>"+
                        "<option>Hamburg</option>"+
                        "<option>Köln</option>"+
                "</select>"+
                "<br><br>"+
                "<label>Titel*</label>"+
                "<br>"+
                "<input type='text' name='title' placeholder='Titel'>"+
                "<br><br>"+
                "<label>Kategorie*:</label>"+
                "<br>"+
                "<select name='category'>"+
                        "<option>-Bitte auswählen-</option>"+
                        "<option>Hosen</option>"+
                        "<option>Accessoires</option>"+
                        "<option>Röcke</option>"+
                        "<option>Kleider</option>"+
                        "<option>Oberteile</option>"+
                        "<option>Bademode</option>"+
                        "<option>Jacken</option>"+
                        "<option>Unterwäsche</option>"+
                        "<option>Schuhe</option>"+
                        "<option>Sonstiges</option>"+
                "</select>"+
                "<br><br>"+
                "<label>Abteilung*:</label>"+
                "<br>"+
                "<select name='personType'>"+
                        "<option>-Bitte auswählen-</option>"+
                        "<option>Frauen</option>"+
                        "<option>Männer</option>"+
                        "<option>Mädchen</option>"+
                        "<option>Jungen</option>"+
                        "<option>Babys</option>"+
                "</select>"+
                "<br><br>"+
                "<label>Größe*:</label>"+
                "<br>"+
                "<input type='text' name='dressSize' placeholder='Größe'>"+
                "<br><br>"+
                "<label>Verkaufspreis*:</label>"+
                "<br>"+
                "<input type='text' name='price' placeholder='Verkaufspreis'>"+
                "<br><br>"+
                "<input type='button' name='submit' value='Anbieten' onClick='saveNewItem(" + customerId + ")'/>"+
            "</div>";
}

function saveNewItem(customerId){
    var locationPlace;
    var title = document.getElementsByName("title")[0].value;
    var category;
    var dressSize = document.getElementsByName("dressSize")[0].value;
    var price = document.getElementsByName("price")[0].value;
    var personType;
//    var sold;
//    var published;
    var ajax = new XMLHttpRequest();
    
    for (i=0; i<document.getElementsByName("locationPlace")[0].length; i++) {
        if(document.getElementsByName("locationPlace")[0].options[i].selected === true) {
            locationPlace = document.getElementsByName("locationPlace")[0].options[i].value;
        }
    }
    
    for (i=0; i<document.getElementsByName("category")[0].length; i++) {
        if(document.getElementsByName("category")[0].options[i].selected === true) {
            category = document.getElementsByName("category")[0].options[i].value;
        }
    }
    
    for (i=0; i<document.getElementsByName("personType")[0].length; i++) {
        if(document.getElementsByName("personType")[0].options[i].selected === true) {
            personType = document.getElementsByName("personType")[0].options[i].value;
        }
    }
    
//    if (document.soldButtons.sold[0].checked === true) {
//        sold = true;
//    } else {
//        sold = false;
//    }
//    
//    if (document.publishedButtons.published[0].checked === true) {
//        published = true;
//    } else {
//        published = false;
//    }
    
    ajax.responseType = "json";
    ajax.open("POST", "servlet?action=createnewitem&customerid=" + encodeURI(customerId)
            + "&locationplace=" + encodeURI(locationPlace) + "&title=" + encodeURI(title)
            + "&category=" + encodeURI(category) + "&dresssize=" + encodeURI(dressSize)
            + "&price=" + encodeURI(price) + "&persontype=" + encodeURI(personType), true);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            alert("Kleidungsstück erfolgreich angelegt! Bitte warten Sie die Freischaltung durch unsere Mitarbeiter ab!");
        }
    };
    
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
        if (this.readyState === 4 && this.status === 200) {
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

function findAllItems(customerId) {
    var ajax = new XMLHttpRequest();
    
    ajax.responseType = "json";
    ajax.open("GET", "servlet?action=findallitems&customerid=" + customerId, true);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            for (i=0; i<this.response.items.length; i++) {
                content.innerHTML += "<div class='Artikel' id='" + this.response.items[i].id + "'>"
                                        + "<p>" + this.response.items[i].title + "</p>"
                                        + "<p>" + this.response.items[i].customerId + "</p>"
                                        + "<p>" + this.response.items[i].category  + "</p>"
                                        + "<p>" + this.response.items[i].personType  + "</p>"
                                        + "<p>" + this.response.items[i].locationPlace  + "</p>"
                                        + "<div class='size'>Größe: " + this.response.items[i].dressSize + "</div>"
                                        + "<div class='preis'>" + this.response.items[i].price + " €"
                                        + "<p> Artikel verkauft:" + this.response.items[i].sold  + "</p>"
                                        + "<p> Artikel veröffentlicht:" + this.response.items[i].published  + "</p>"
                                        + "<p class='delete' id='" + this.response.items[i].id
                                            + "' onClick='deleteItem(" + this.response.items[i].id + ")'>löschen</p>"
                                    + "</div>";
            }
        }
    };
}

function findItemsOfAllCustomers() {
    var ajax = new XMLHttpRequest();
    
    ajax.responseType = "json";
    ajax.open("GET", "servlet?action=findallcustomers", true);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            for (j=0; j<this.response.length; j++) {
                for (i=0; i<this.response[j].items.length; i++) {
                    var newHTML = "<div class='Artikel' id='" + this.response[j].items[i].id + "'>"
                                    + "<p>" + this.response[j].items[i].title + "</p>"
                                    + "<p>" + this.response[j].items[i].category  + "</p>"
                                    + "<p>" + this.response[j].items[i].personType  + "</p>"
                                    + "<p>" + this.response[j].items[i].locationPlace  + "</p>"
                                    + "<div class='size'>Größe: " + this.response[j].items[i].dressSize + "</div>"
                                    + "<div class='preis'>" + this.response[j].items[i].price + " €"
                                + "</div>";
                document.getElementsByClassName("items")[0].innerHTML += newHTML;
                }
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
        if (this.readyState === 4 && this.status === 200) {
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
        if (this.readyState === 4 && this.status === 200) {
            var parent = document.getElementById("content");
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

//Methode von Ann-Katrin
function login_check(){
    var email = document.getElementById("email").value;
    var pw =  document.getElementById("pw").value;
      
    if(email === "" || pw === ""){
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
                "<a onclick='myItems()'>My2Hand</a>"+
                "<a href='/Gruppe5/SecondHand/'>Home</a>";

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
            email: email,
            pw: pw
        }
    
    ));
    //Auf Startseite springen
    }
}

//Methode von Ann-Katrin
function logout(){
    var r = confirm("Wollen Sie sich wirklich ausloggen?");
    if(r === true){
        var navigation = document.getElementById("feld");
        navigation.innerHTML = "<a onclick='xxx()'>Profil</a>" +
                    "<a onclick='login()'>Login</a>" +
                    "<a onclick='myItems()'>My2Hand</a>"+
                    "<a href='/Gruppe5/SecondHand/'>Home</a>";
        loggingCustomer = null;
        
        var welcome = document.getElementById("willkommen");
        welcome.innerHTML = "Herzlich Willkommen";
    }
}

//Methode von Ann-Katrin
function myItems(){
    var content = document.getElementById("content");
    
    if(loggingCustomer){  
        content.innerHTML = "<h1>Meine Artikel</h1>" +
                "<input type='button' name='submit' value='Artikel verkaufen' onClick='createNewItem(" + loggingCustomer + ")'/><br>";
        findAllItems(loggingCustomer);
    }
    else{
        content.innerHTML = "<h1>Bitte loggen Sie sich ein, damit Sie Ihre Artikel sehen können!</h1>";
    }
}

//Methode von Isabell
function sellArticles()
{
    var standort;
    var kategorie;
    var abteilung;
    var groessen;
    
    var titel;
    var preis;
     
    if (document.getElementsByName("standort")[0].checked) {
        standort = document.getElementsByName("standort")[0].value;               //Karlsruhe
    } 
    else {if (document.getElementsByName("standort")[1].checked) {            
        standort = document.getElementsByName("standort")[1].value;}              //Berlin
        else {if (document.getElementsByName("standort")[2].checked) {
            standort = document.getElementsByName("standort")[2].value;}          //München
            else {if (document.getElementsByName("standort")[3].checked) {
                standort = document.getElementsByName("standort")[3].value;}      //Hamburg
            }
        }
      salutation = document.getElementsByName("standort")[4].value;               //Köln
    }
    
    if (document.getElementsByName("kategorie")[0].checked) {
        kategorie = document.getElementsByName("kategorie")[0].value;             //Hosen
    } 
    else {if (document.getElementsByName("kategorie")[1].checked) {
        kategorie = document.getElementsByName("kategorie")[1].value;
        }
            else {if (document.getElementsByName("kategorie")[2].checked) {
            kategorie = document.getElementsByName("kategorie")[2].value;
            }
            else {if (document.getElementsByName("kategorie")[3].checked) {
                kategorie = document.getElementsByName("kategorie")[3].value;
                }
                else {if (document.getElementsByName("kategorie")[4].checked) {
                    kategorie = document.getElementsByName("kategorie")[4].value;
                    }
                    else {if (document.getElementsByName("kategorie")[5].checked) {
                        kategorie = document.getElementsByName("kategorie")[5].value;
                        }
                        else {if (document.getElementsByName("kategorie")[6].checked) {
                            kategorie = document.getElementsByName("kategorie")[6].value;
                            }
                            else {if (document.getElementsByName("kategorie")[7].checked) {
                                kategorie = document.getElementsByName("kategorie")[7].value;
                                }
                                else {if (document.getElementsByName("kategorie")[8].checked) {
                                    kategorie = document.getElementsByName("kategorie")[8].value;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }    
      kategorie = document.getElementsByName("kategorie")[9].value;
    }
    
    if (document.getElementsByName("abteilung")[0].checked) {
        abteilung = document.getElementsByName("abteilung")[0].value;               //Männer
    } 
    else {if (document.getElementsByName("abteilung")[1].checked) {            
        abteilung = document.getElementsByName("abteilung")[1].value;}              //Frauen
        else {if (document.getElementsByName("abteilung")[2].checked) {
            abteilung = document.getElementsByName("abteilung")[2].value;}          //Mädchne
            else {if (document.getElementsByName("abteilung")[3].checked) {
                abteilung = document.getElementsByName("abteilung")[3].value;}      //Jungen
            }
        }
      abteilung = document.getElementsByName("abteilung")[4].value;                  //Babys
    }
    
    if (document.getElementsByName("groessen")[0].checked) {
        groessen = document.getElementsByName("groessen")[0].value;             //XS
    } 
    else {if (document.getElementsByName("groessen")[1].checked) {
        groessen = document.getElementsByName("groessen")[1].value;             //S
        }
            else {if (document.getElementsByName("groessen")[2].checked) {
            groessen = document.getElementsByName("groessen")[2].value;         //M
            }
            else {if (document.getElementsByName("groessen")[3].checked) {
                groessen = document.getElementsByName("groessen")[3].value;     //L
                }
                else {if (document.getElementsByName("groessen")[4].checked) {
                    groessen = document.getElementsByName("groessen")[4].value; //XL
                    }
                }
            }
        }    
      groessen = document.getElementsByName("groessen")[5].value;               //GSonstiges
    }
    
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "Checkbox");
    ajax.responseType = "json";
    ajax.addEventListener("load", function(){
        console.log(ajax.response);
        
        for ( int i = 0; i==10 ;i++){
                var content = document.getElementById("content");
                content.innerHTML="<div class='Artikel'>"+
                    "<img src='Artikel_img/A1B1.jpg' alt="+ titel +"/>"+
                    "<p>heißes Dirndel</p>"+
                    "<div class='size'> <a>S/36</a> </div>"+
                    "<div class='preis'> <a><u>"+ preis +"</u></a></div>"+
                    "</div>";
        }
        
    });
    
    
    ajax.send(JSON.stringify(
    {
        standort: standort, 
        kategorie: kategorie,
        abteilung: abteilung,
        groessen: groessen,
    }
    ));
    
}
