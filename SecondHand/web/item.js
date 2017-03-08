function findItemsOfAllCustomers() {
    document.getElementById("other").innerHTML = "<div id='selection'>"
            + "<form>"
            + "<b>Standort</b>"
            + "<hr>"
            + "<input type='radio' name='standort' value='ka'>Karlsruhe<br>"
            + "<input type='radio' name='standort' value='b'>Berlin<br>"
            + "<input type='radio' name='standort' value='m'>München<br>"
            + "<input type='radio' name='standort' value='hh'>Hamburg<br>"
            + "<input type='radio' name='standort' value='k'>Köln<br>"
            + "<br><b>Kategorie</b>"
            + "<hr>"
            + "<input type='radio' name='kategorie' value='Hosen'>Hosen<br>"
            + "<input type='radio' name='kategorie' value='Accessoires'>Accessoires<br>"
            + "<input type='radio' name='kategorie' value='Röcke'>Röcke<br>"
            + "<input type='radio' name='kategorie' value='Kleider'>Kleider<br>"
            + "<input type='radio' name='kategorie' value='Oberteile'>Oberteile<br>"
            + "<input type='radio' name='kategorie' value='Bademoden'>Bademode<br>"
            + "<input type='radio' name='kategorie' value='Jacken'>Jacken<br>"
            + "<input type='radio' name='kategorie' value='Unterwaesche'>Unterwäsche<br>"
            + "<input type='radio' name='kategorie' value='Schuhe'>Schuhe<br>"
            + "<input type='radio' name='kategorie' value='Sonstiges'>Sonstiges<br>"
            + "<br> <b>Abteilung</b>"
            + "<hr/>"
            + "<input type='radio' name='abteilung' value='Maenner'>Männer<br>"
            + "<input type='radio' name='abteilung' value='Frauen'>Frauen<br>"
            + "<input type='radio' name='abteilung' value='Maedchen'>Mädchen<br>"
            + "<input type='radio' name='abteilung' value='Jungen'>Jungen<br>"
            + "<input type='radio' name='abteilung' value='Babys'>Babys<br>"
            + "<br><b>Größen</b>"
            + "<hr/>"
            + "<input type='radio' name='groessen' value='XS'>XS<br>"
            + "<input type='radio' name='groessen' value='S'>S<br>"
            + "<input type='radio' name='groessen' value='M'>M<br>"
            + "<input type='radio' name='groessen' value='L'>L<br>"
            + "<input type='radio' name='groessen' value='XL'>XL<br>"
            + "<input type='radio' name='groessen' value='GSonstiges'>Sonstiges<br>"
            + "<br>"
            + "<input type='button' name='submit' value='Suchen' onClick='sellArticles()'/>"
            + "</form>"
            + "</div>"
            + "<div id='content'>"
            + "</div>";

    var ajax = new XMLHttpRequest();

    ajax.responseType = "json";
    ajax.open("GET", "servlet?action=finditemsofallcustomers", true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("content").innerHTML = "<div class='items'></div>";
            console.log(this.response);
            for (i = 0; i < this.response.length; i++) {
                var newHTML = "<div class='Artikel' id='" + this.response[i].id + "'>"
                        + "<img src='" + this.response[i].imagePath + "' alt='Artikelbild'/>"
                        + "<p>" + this.response[i].title + "</p>"
                        + "<p>" + this.response[i].categoryName + "</p>"
                        + "<p>" + this.response[i].personTypeName + "</p>"
                        + "<p>" + this.response[i].locationPlace + "</p>"
                        + "<div class='size'>Größe: " + this.response[i].dressSizeName + "</div>"
                        + "<div class='preis'>" + this.response[i].price + " €"
                        + "</div>";
                document.getElementsByClassName("items")[0].innerHTML += newHTML;
            }
        }
    };
}

function findAllItems(customerId) {
    var ajax = new XMLHttpRequest();

    ajax.responseType = "json";
    ajax.open("GET", "servlet?action=findallitems&customerid=" + customerId, true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            for (i = 0; i < this.response.items.length; i++) {
                content.innerHTML += "<div class='Artikel' id='" + this.response.items[i].id + "'>"
                        + "<img src='" + this.response.items[i].imagePath + "' alt='Artikelbild'/>"
                        + "<p>" + this.response.items[i].title + "</p>"
                        + "<p>" + this.response.items[i].customerId + "</p>"
                        + "<p>" + this.response.items[i].categoryName + "</p>"
                        + "<p>" + this.response.items[i].personTypeName + "</p>"
                        + "<p>" + this.response.items[i].locationPlace + "</p>"
                        + "<div class='size'>Größe: " + this.response.items[i].dressSizeName + "</div>"
                        + "<div class='preis'>" + this.response.items[i].price + " €"
                        + "<p> Artikel verkauft:" + this.response.items[i].sold + "</p>"
                        + "<p> Artikel veröffentlicht:" + this.response.items[i].published + "</p>"
                        + "<p class='update' id='" + this.response.items[i].id
                        + "' onClick='updateItem(" + this.response.items[i].id + ")'>bearbeiten</p>"
                        + "<p class='delete' id='" + this.response.items[i].id
                        + "' onClick='deleteItem(" + this.response.items[i].id + ")'>löschen</p>"
                        + "</div>";
            }
        }
    };
}

function createNewItem() {
    var content = document.getElementById("content");
    content.innerHTML = "<form id='formItems' action='' method='post' enctype='multipart/form-data'>" +
            "<h1>Kleidungsstück verkaufen</h1>" +
            "<label>Standort*:</label>" +
            "<br>" +
            "<select name='locationPlace'>" +
            "<option>-Bitte auswählen-</option>" +
            "<option>Karlsruhe</option>" +
            "<option>Berlin</option>" +
            "<option>München</option>" +
            "<option>Hamburg</option>" +
            "<option>Köln</option>" +
            "</select>" +
            "<br><br>" +
            "<label>Titel*</label>" +
            "<br>" +
            "<input type='text' name='title' placeholder='Titel'>" +
            "<br><br>" +
            "<label>Kategorie*:</label>" +
            "<br>" +
            "<select name='categoryName'>" +
            "<option>-Bitte auswählen-</option>" +
            "<option>Hosen</option>" +
            "<option>Accessoires</option>" +
            "<option>Röcke</option>" +
            "<option>Kleider</option>" +
            "<option>Oberteile</option>" +
            "<option>Bademode</option>" +
            "<option>Jacken</option>" +
            "<option>Unterwäsche</option>" +
            "<option>Schuhe</option>" +
            "<option>Sonstiges</option>" +
            "</select>" +
            "<br><br>" +
            "<label>Abteilung*:</label>" +
            "<br>" +
            "<select name='personTypeName'>" +
            "<option>-Bitte auswählen-</option>" +
            "<option>Frauen</option>" +
            "<option>Männer</option>" +
            "<option>Mädchen</option>" +
            "<option>Jungen</option>" +
            "<option>Babys</option>" +
            "</select>" +
            "<br><br>" +
            "<label>Größe*:</label>" +
            "<br>" +
            "<select name='dressSizeName'>" +
            "<option>-Bitte auswählen-</option>" +
            "<option>XS</option>" +
            "<option>S</option>" +
            "<option>M</option>" +
            "<option>L</option>" +
            "<option>XL</option>" +
            "<option>Sonstiges</option>" +
            "</select>" +
            "<br><br>" +
            "<label>Verkaufspreis*:</label>" +
            "<br>" +
            "<input type='text' name='price' placeholder='Verkaufspreis'>" +
            "<br><br>" +
            "<label>Bild hochladen*:</label>" +
            "<br>" +
            "<input type='file' name='imageUpload' accept='image/*'/>" +
            "<br><br>" +
            "<input type='submit' name='formItemsButton' value='Anbieten' onClick='actionString()'/>" +
            "</form>";
}

function actionString() {
    var locationPlace;
    var title = document.getElementsByName("title")[0].value;
    var categoryName;
    var dressSizeName;
    var price = document.getElementsByName("price")[0].value;
    var personTypeName;
    var image = document.getElementsByName("imageUpload")[0].value;

    for (i = 0; i < document.getElementsByName("locationPlace")[0].length; i++) {
        if (document.getElementsByName("locationPlace")[0].options[i].selected === true) {
            locationPlace = document.getElementsByName("locationPlace")[0].options[i].value;
        }
    }

    for (i = 0; i < document.getElementsByName("categoryName")[0].length; i++) {
        if (document.getElementsByName("categoryName")[0].options[i].selected === true) {
            categoryName = document.getElementsByName("categoryName")[0].options[i].value;
        }
    }

    for (i = 0; i < document.getElementsByName("personTypeName")[0].length; i++) {
        if (document.getElementsByName("personTypeName")[0].options[i].selected === true) {
            personTypeName = document.getElementsByName("personTypeName")[0].options[i].value;
        }
    }

    for (i = 0; i < document.getElementsByName("dressSizeName")[0].length; i++) {
        if (document.getElementsByName("dressSizeName")[0].options[i].selected === true) {
            dressSizeName = document.getElementsByName("dressSizeName")[0].options[i].value;
        }
    }

    if (locationPlace === "-Bitte auswählen-" || title === "" || categoryName === "-Bitte auswählen-"
            || personTypeName === "-Bitte auswählen-" || dressSizeName === "-Bitte auswählen-"
            || price === "" || image === "") {
        alert("Bitte füllen Sie alle Pflichtfelder aus!");
    } else {
        var actionString = "servlet?action=createnewitem&customerid=" + encodeURI(getCookie())
                + "&locationplace=" + encodeURI(locationPlace) + "&title=" + encodeURI(title)
                + "&categoryname=" + encodeURI(categoryName) + "&dresssizename=" + encodeURI(dressSizeName)
                + "&price=" + encodeURI(price) + "&persontypename=" + encodeURI(personTypeName);
        document.getElementById("formItems").setAttribute("action", actionString);
    }
}

//Methode von Ann-Katrin
function myItems() {
    if (document.getElementById("selection")) {
        var parent = document.getElementById("other");
        var child = document.getElementById("selection");
        parent.removeChild(child);
    }

    var content = document.getElementById("content");

    if (document.cookie) {
        content.innerHTML = "<h1>Meine Artikel</h1>" +
                "<input type='button' name='submit' value='Artikel verkaufen' onClick='createNewItem()'/><br>";
        findAllItems(getCookie());
    } else {
        content.innerHTML = "<h1>Bitte loggen Sie sich ein, damit Sie Ihre Artikel sehen können!</h1>";
    }
}

function updateItem(id) {
    var ajax = new XMLHttpRequest();

    ajax.responseType = "json";
    ajax.open("GET", "servlet?action=finditem&itemid=" + id, true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var content = document.getElementById("content");
            content.innerHTML = "<div id='updateItem'>" +
                    "<h1>Artikel bearbeiten</h1>" +
                    "<label>Standort:</label>" +
                    "<br>" +
                    this.response.locationPlace +
                    "<br><br>" +
                    "<label>Titel*</label>" +
                    "<br>" +
                    "<input type='text' name='title' value='" + this.response.title + "'>" +
                    "<br><br>" +
                    "<label>Kategorie:</label>" +
                    "<br>" +
                    this.response.categoryName +
                    "<br><br>" +
                    "<label>Abteilung:</label>" +
                    "<br>" +
                    this.response.personTypeName +
                    "<br><br>" +
                    "<label>Größe:</label>" +
                    "<br>" +
                    this.response.dressSizeName +
                    "<br><br>" +
                    "<label>Verkaufspreis*:</label>" +
                    "<br>" +
                    "<input type='text' name='price' value='" + this.response.price + "'>" +
                    "<br><br>" +
                    "<input type='button' name='submit' value='Speichern' onClick='saveItemsUpdates(" + this.response.id + ")'/>" +
                    "</div>";
        }
    };
}

function saveItemsUpdates(id) {
    var title = document.getElementsByName("title")[0].value;
    var price = document.getElementsByName("price")[0].value;

    if (title === "" || price === "") {
        alert("Bitte füllen Sie alle Pflichtfelder aus!");
        return;
    }

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "servlet?action=updateitem&id=" + encodeURI(id)
            + "&title=" + encodeURI(title) + "&price=" + encodeURI(price), true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(ajax.response);
            alert("Ihr Artikel wurde erfolgreich aktualisiert!");
            myItems();
        }
    };
}

function deleteItem(id) {
    var result = confirm("Wollen Sie das Kleidungsstück wirklich löschen?");
    if (!result)
        return;

    var ajax = new XMLHttpRequest();

    ajax.responseType = "json";
    ajax.open("GET", "servlet?action=deleteitem&itemid=" + id, true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var parent = document.getElementById("content");
            var child = document.getElementById(id);
            parent.removeChild(child);
        }
    };
}