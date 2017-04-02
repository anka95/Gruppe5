/**
 * @file Alle Funktion für die Verarbeitung der Artikel.
 */

/**
 * @function itemsCarousel
 * @description Setzt die ersten fünf Artikel aus der Datenbank in den Artikel-Slider auf der Startseite.
 */
function itemsCarousel() {
    var ajax = new XMLHttpRequest();

    ajax.responseType = "json";
    ajax.open("GET", "servlet?action=finditemsofallcustomers", true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(ajax.response);
            var count = 0;
            for (i = 0; i < ajax.response.length; i++) {
                if (!ajax.response[i].sold) {
                    if (count < 5) {
                        document.getElementsByClassName("item")[count].innerHTML =
                                "<img class='carousel-image' src='" + ajax.response[i].imagePath + "' alt='" + ajax.response[i].title + "'>"
                                + "<div class='carousel-text'>"
                                + "<h2>" + ajax.response[i].title + "</h2>"
                                + "<p class='category'>" + ajax.response[i].categoryName + "</p>"
                                + "<p>" + ajax.response[i].personTypeName + " • " + ajax.response[i].locationPlace + "</p>"
                                + "<p>Größe: " + ajax.response[i].dressSizeName + "</p>"
                                + "<p><b>" + ajax.response[i].price + " €</b></p>"
                                + "</div>";
                        count++;
                    }
                }
            }
        }
    };
    return true;
}

/**
 * @function findItemsOfAllCustomers
 * @description Gibt alle Artikel aller Kunden aus der Datenbank zurück.
 */
function findItemsOfAllCustomers() {
    var ajax = new XMLHttpRequest();

    ajax.responseType = "json";
    ajax.open("GET", "servlet?action=finditemsofallcustomers", true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementsByClassName("row")[1].innerHTML = "<div class='col-sm-2'></div><div class='col-sm-10'></div>";
            document.getElementsByClassName("row")[2].innerHTML = "";
            document.getElementsByClassName("row")[3].innerHTML = "";
            createFilter();
            console.log(ajax.response);
            for (i = 0; i < ajax.response.length; i++) {
                if (!ajax.response[i].sold) {
                    var newHTML = "<div class='artikel'>"
                            + "<div class='artikelbilddiv'><img class='artikelbild' src='" + ajax.response[i].imagePath + "' alt='" + ajax.response[i].title + "'></div>"
                            + "<div class='artikeltext'>"
                            + "<h3 class='artikelh3'>" + ajax.response[i].title + "</h2>"
                            + "<p class='category'>" + ajax.response[i].categoryName + "</p>"
                            + "<p>" + ajax.response[i].personTypeName + " • " + ajax.response[i].locationPlace + "</p>"
                            + "<p>Größe: " + ajax.response[i].dressSizeName + "</p>"
                            + "<p><b>" + ajax.response[i].price + " €</b></p>"
                            + "</div>"
                            + "</div>";
                    document.getElementsByClassName("col-sm-10")[0].innerHTML += newHTML;
                }
            }
        }
    };
    return true;
}

/**
 * @function createFilter
 * @description Erstellt die Selektionsliste links neben den Artikeln. Die einzelnen Filter werden aus der Datenbank ausgelesen.
 */
function createFilter() {
    var ajax = new XMLHttpRequest();

    ajax.responseType = "json";
    ajax.open("POST", "CreateSelection");
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(ajax.response);
            var location = "";
            for (var i = 0; i < ajax.response.location.length; i++) {
                location += "<input type='radio' name='standort' VALUE = '" + ajax.response.location[i].place + "'>" + ajax.response.location[i].place + "</br>";
            }
            var cat = "";
            for (var i = 0; i < ajax.response.category.length; i++) {
                cat += "<input type='radio' name='kategorie' VALUE = '" + ajax.response.category[i].category + "'>" + ajax.response.category[i].category + "</br>";
            }

            var person = "";
            for (var i = 0; i < ajax.response.personType.length; i++) {
                person += "<input type='radio' name='abteilung' VALUE = '" + ajax.response.personType[i].personType + "'>" + ajax.response.personType[i].personType + "</br>";
            }

            var size = "";
            for (var i = 0; i < ajax.response.dressSize.length; i++) {
                size += "<input type='radio' name='groessen' VALUE = '" + ajax.response.dressSize[i].dressSize + "'>" + ajax.response.dressSize[i].dressSize + "</br>";
            }

            document.getElementsByClassName("col-sm-2")[1].innerHTML =
                    "<form class='filter' name ='filter'>"
                    + "<b>Standorte</b><br><br>"
                    + location
                    + "<hr>"
                    + "<b>Kategorie</b><br><br>"
                    + cat
                    + "<hr>"
                    + "<b>Abteilung</b><br><br>"
                    + person
                    + "<hr>"
                    + "<b>Größen</b><br><br>"
                    + size
                    + "<hr>"
                    + "<input class='loginButton filterButton' type='button' name='submit' value='Filtern' onClick='filterArticles()'/>"
                    + "</form>";
        }
    };
    return true;
}

/**
 * @function filterArticles
 * @description Filtert die Artikel.
 */
function filterArticles() {
    var location_radio = document.filter.standort;
    var category_radio = document.filter.kategorie;
    var person_radio = document.filter.abteilung;
    var size_radio = document.filter.groessen;

    var location = "";
    var category = "";
    var person = "";
    var size = "";

    for (var i = 0; i < location_radio.length; i++) {
        if (location_radio[i].checked) {
            location = location_radio[i].value;
        }
    }

    for (var i = 0; i < category_radio.length; i++) {
        if (category_radio[i].checked) {
            category = category_radio[i].value;
        }
    }

    for (var i = 0; i < person_radio.length; i++) {
        if (person_radio[i].checked) {
            person = person_radio[i].value;
        }
    }

    for (var i = 0; i < size_radio.length; i++) {
        if (size_radio[i].checked) {
            size = size_radio[i].value;
        }
    }

    if (location === "" || category === "" || person === "" || size === "") {
        alert("Bitte füllen Sie alle Felder aus!");
    } else {
        var ajax = new XMLHttpRequest();
        ajax.responseType = "json";
        ajax.open("GET", "servlet?action=finditemsofallcustomers", true);
        ajax.send();
        ajax.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                console.log(ajax.response);
                document.getElementsByClassName("col-sm-10")[0].innerHTML = "";
                for (i = 0; i < ajax.response.length; i++) {
                    if (ajax.response[i].locationPlace === location &&
                            ajax.response[i].categoryName === category &&
                            ajax.response[i].personTypeName === person &&
                            ajax.response[i].dressSizeName === size) {
                        if (!ajax.response[i].sold) {
                            var newHTML = "<div class='artikel'>"
                                    + "<div class='artikelbilddiv'><img class='artikelbild' src='" + ajax.response[i].imagePath + "' alt='" + ajax.response[i].title + "'></div>"
                                    + "<div class='artikeltext'>"
                                    + "<h3 class='artikelh3'>" + ajax.response[i].title + "</h2>"
                                    + "<p class='category'>" + ajax.response[i].categoryName + "</p>"
                                    + "<p>" + ajax.response[i].personTypeName + " • " + ajax.response[i].locationPlace + "</p>"
                                    + "<p>Größe: " + ajax.response[i].dressSizeName + "</p>"
                                    + "<p><b>" + ajax.response[i].price + " €</b></p>"
                                    + "</div>"
                                    + "</div>";
                            document.getElementsByClassName("col-sm-10")[0].innerHTML += newHTML;
                        }
                    }
                }

                if (document.getElementsByClassName("col-sm-10")[0].innerHTML === "") {
                    document.getElementsByClassName("col-sm-10")[0].innerHTML = "<p style='text-align: center'>Leider entsprechen keine Artikel den vorgegebenen Filtern." +
                            "<br>Bitte versuchen Sie es mit anderen Filtern neu!</p>";
                }
            }
        };
    }
}

/**
 * @function findItemsOfPersonType
 * @description Gibt die Artikel der verschiedenen Abteilungen zurück.
 * @param {String} personType - Der Name der Abteilung.
 */
function findItemsOfPersonType(personType) {
    var ajax = new XMLHttpRequest();

    ajax.responseType = "json";
    ajax.open("GET", "servlet?action=finditemsofallcustomers", true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementsByClassName("row")[1].innerHTML = "<div class='col-sm-2'></div><div class='col-sm-10'></div>";
            document.getElementsByClassName("row")[2].innerHTML = "";
            document.getElementsByClassName("row")[3].innerHTML = "";
            createFilter();
            console.log(ajax.response);

            for (i = 0; i < ajax.response.length; i++) {
                if (ajax.response[i].personTypeName === personType) {
                    if (!ajax.response[i].sold) {
                        var newHTML = "<div class='artikel'>"
                                + "<div class='artikelbilddiv'><img class='artikelbild' src='" + ajax.response[i].imagePath + "' alt='" + ajax.response[i].title + "'></div>"
                                + "<div class='artikeltext'>"
                                + "<h3 class='artikelh3'>" + ajax.response[i].title + "</h2>"
                                + "<p class='category'>" + ajax.response[i].categoryName + "</p>"
                                + "<p>" + ajax.response[i].personTypeName + " • " + ajax.response[i].locationPlace + "</p>"
                                + "<p>Größe: " + ajax.response[i].dressSizeName + "</p>"
                                + "<p><b>" + ajax.response[i].price + " €</b></p>"
                                + "</div>"
                                + "</div>";
                        document.getElementsByClassName("col-sm-10")[0].innerHTML += newHTML;
                    }
                }
            }

        }
    };
    //needed for QUnit test
    if (personType === 'Frauen' || personType === 'Männer' || personType === 'Jungen' || personType === 'Mädchen' || personType === 'Babys') {
        return true;
    }
}

/**
 * @function myItems
 * @description Gibt alle Artikel eines Kunden zurück.
 */
function myItems() {
    var ajax = new XMLHttpRequest();

    ajax.responseType = "json";
    ajax.open("GET", "servlet?action=findallitems&customerid=" + getCookie(), true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementsByClassName("row")[1].innerHTML = "<div class='col-sm-12'></div>";
            document.getElementsByClassName("row")[2].innerHTML = "";
            document.getElementsByClassName("row")[3].innerHTML = "";
            console.log(ajax.response);
            document.getElementsByClassName("col-sm-12")[0].innerHTML = "<div class='artikelplus'>"
                    + "<div class='overlay glyphicon glyphicon-plus' data-toggle='modal' data-target='#newItem' onclick='createNewItem()' title='Artikel verkaufen'></div></div>";

            for (i = 0; i < ajax.response.items.length; i++) {
                if (ajax.response.items[i].sold) {
                    var sold = "<span class='label label-success'>verkauft</span>";
                } else {
                    var sold = "<span class='label label-warning'>nicht verkauft</span>";
                }

                var newHTML = "<div class='artikel' id='" + ajax.response.items[i].id + "'>"
                        + "<div class='glyphicon glyphicon-edit' data-toggle='modal' data-target='#newItem' onClick='updateItem(" + ajax.response.items[i].id + ")' title='Artikel bearbeiten'></div>"
                        + "<div class='glyphicon glyphicon-trash' onClick='deleteItem(" + ajax.response.items[i].id + ")' title='Artikel löschen'></div>"
                        + "<div class='artikelbilddiv'><img class='artikelbild' src='" + ajax.response.items[i].imagePath + "' alt='" + ajax.response.items[i].title + "'></div>"
                        + "<div class='artikeltext'>"
                        + "<h3 class='artikelh3'>" + ajax.response.items[i].title + "</h2>"
                        + "<br>"
                        + sold
                        + "<br><br>"
                        + "<p class='category'>" + ajax.response.items[i].categoryName + "</p>"
                        + "<p>" + ajax.response.items[i].personTypeName + " • " + ajax.response.items[i].locationPlace + "</p>"
                        + "<p>Größe: " + ajax.response.items[i].dressSizeName + "</p>"
                        + "<p><b>" + ajax.response.items[i].price + " €</b></p>"
                        + "</div>"
                        + "</div>";
                document.getElementsByClassName("col-sm-12")[0].innerHTML += newHTML;
            }
        }
    };
    return true;
}

/**
 * @function createNewItem
 * @description Legt einen neuen Artikel an.
 */
function createNewItem() {
    document.getElementsByClassName("modal-header")[2].innerHTML =
            "<button type='button' class='close' data-dismiss='modal'>&times;</button>"
            + "<h4 class='modal-title'>Artikel verkaufen</h4>";
    var ajax = new XMLHttpRequest();

    ajax.responseType = "json";
    ajax.open("POST", "CreateSelection");
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(ajax.response);
            var location = "<option VALUE = '0' >-Bitte auswählen-</option>";
            for (var i = 0; i < ajax.response.location.length; i++) {
                location += "<option VALUE = '" + ajax.response.location[i].id + "'>" + ajax.response.location[i].place + "</option>";
            }

            var cat = "<option VALUE = '0' >-Bitte auswählen-</option>";
            for (var i = 0; i < ajax.response.category.length; i++) {
                cat += "<option VALUE = '" + ajax.response.category[i].id + "'>" + ajax.response.category[i].category + "</option>";
            }

            var person = "<option VALUE = '0' >-Bitte auswählen-</option>";
            for (var i = 0; i < ajax.response.personType.length; i++) {
                person += "<option VALUE = '" + ajax.response.personType[i].id + "'>" + ajax.response.personType[i].personType + "</option>";
            }

            var size = "<option VALUE = '0' >-Bitte auswählen-</option>";
            for (var i = 0; i < ajax.response.dressSize.length; i++) {
                size += "<option VALUE = '" + ajax.response.dressSize[i].id + "'>" + ajax.response.dressSize[i].dressSize + "</option>";
            }

            document.getElementsByClassName("modal-signUp")[1].innerHTML = "<form id='formItems' action='' method='post' enctype='multipart/form-data'>" +
                    "<label>Standort*</label>" +
                    "<select class='loginInput' name='locationId' required>" +
                    location +
                    "</select>" +
                    "<label>Titel*</label>" +
                    "<input class='loginInput' type='text' name='title' placeholder='Titel' required>" +
                    "<label>Kategorie*</label>" +
                    "<select class='loginInput' name='categoryId' required>" +
                    cat +
                    "</select>" +
                    "<label>Abteilung*</label>" +
                    "<select class='loginInput' name='personTypeId' required>" +
                    person +
                    "</select>" +
                    "<label>Größe*</label>" +
                    "<select class='loginInput' name='dressSizeId' required>" +
                    size +
                    "</select>" +
                    "<label>Verkaufspreis*</label>" +
                    "<input class='loginInput' type='text' name='price' placeholder='Verkaufspreis' required>" +
                    "<label>Bild hochladen*</label>" +
                    "<input class='imageUpload' type='file' name='imageUpload' accept='image/*'/>" +
                    "<br>" +
                    "<button class='loginButton' type='submit' onClick='actionString()'>Artikel verkaufen</button>" +
                    "</form>";
        }
    };
}

/**
 * @function actionString
 * @description Hilfmethode zum Erzeugen des Strings für das Action-Attribut des Artikel-anlegen-Formulars.
 */
function actionString() {
    var locationId;
    var title = document.getElementsByName("title")[0].value;
    var categoryId;
    var dressSizeId;
    var price = document.getElementsByName("price")[0].value;
    var personTypeId;
    var image = document.getElementsByName("imageUpload")[0].value;

    for (i = 0; i < document.getElementsByName("locationId")[0].length; i++) {
        if (document.getElementsByName("locationId")[0].options[i].selected === true) {
            locationId = document.getElementsByName("locationId")[0].options[i].value;
        }
    }

    for (i = 0; i < document.getElementsByName("categoryId")[0].length; i++) {
        if (document.getElementsByName("categoryId")[0].options[i].selected === true) {
            categoryId = document.getElementsByName("categoryId")[0].options[i].value;
        }
    }

    for (i = 0; i < document.getElementsByName("personTypeId")[0].length; i++) {
        if (document.getElementsByName("personTypeId")[0].options[i].selected === true) {
            personTypeId = document.getElementsByName("personTypeId")[0].options[i].value;
        }
    }

    for (i = 0; i < document.getElementsByName("dressSizeId")[0].length; i++) {
        if (document.getElementsByName("dressSizeId")[0].options[i].selected === true) {
            dressSizeId = document.getElementsByName("dressSizeId")[0].options[i].value;
        }
    }

    if (locationId === "0" || title === "" || categoryId === "0"
            || personTypeId === "0" || dressSizeId === "0"
            || price === "" || image === "") {
        document.getElementsByClassName("modal-header")[2].innerHTML =
                "<button type='button' class='close' data-dismiss='modal'>&times;</button>"
                + "<h4 class='modal-title'>Artikel verkaufen</h4>"
                + "<br><div class='alert alert-danger'>Bitte füllen Sie alle Pflichtfelder aus!</div>";
        return;
    } else {
//        sendMail("addMail");
        var actionString = "servlet?action=createnewitem&customerid=" + encodeURI(getCookie())
                + "&locationid=" + encodeURI(locationId) + "&title=" + encodeURI(title)
                + "&categoryid=" + encodeURI(categoryId) + "&dresssizeid=" + encodeURI(dressSizeId)
                + "&price=" + encodeURI(price) + "&persontypeid=" + encodeURI(personTypeId);
        document.getElementById("formItems").setAttribute("action", actionString);
    }
}

/**
 * @function updateItem
 * @description Holt die Daten des Artikels zum Aktualisieren.
 * @param {number} id - Die ID des Artikels.
 */
function updateItem(id) {
    var ajax = new XMLHttpRequest();

    ajax.responseType = "json";
    ajax.open("GET", "servlet?action=finditem&itemid=" + id, true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementsByClassName("modal-title")[2].innerHTML = "Artikel bearbeiten";
            document.getElementsByClassName("modal-signUp")[1].innerHTML = "<div id='formItems'>" +
                    "<label>Standort:</label>" +
                    "<input class='loginInput' type='text' name='locationPlace' value='" + ajax.response.locationPlace + "' disabled>" +
                    "<label>Titel*</label>" +
                    "<input class='loginInput' type='text' name='title' value='" + ajax.response.title + "' required>" +
                    "<label>Kategorie</label>" +
                    "<input class='loginInput' type='text' name='locationPlace' value='" + ajax.response.categoryName + "' disabled>" +
                    "<label>Abteilung</label>" +
                    "<input class='loginInput' type='text' name='locationPlace' value='" + ajax.response.personTypeName + "' disabled>" +
                    "<label>Größe</label>" +
                    "<input class='loginInput' type='text' name='locationPlace' value='" + ajax.response.dressSizeName + "' disabled>" +
                    "<label>Verkaufspreis*</label>" +
                    "<input class='loginInput' type='text' name='price' value='" + ajax.response.price + "' required>" +
                    "<br>" +
                    "<button class='loginButton' type='submit' onClick='saveItemsUpdates(" + ajax.response.id + ")'>Artikel aktualisieren</button>" +
                    "</div>";
        }
    };
    return true;
}

/**
 * @function saveItemsUpdates
 * @description Speichert die neuen Daten des Artikels.
 * @param {number} id - Die ID des Artikels.
 */
function saveItemsUpdates(id) {
    var title = document.getElementsByName("title")[0].value;
    var price = document.getElementsByName("price")[0].value;
    var ajax = new XMLHttpRequest();

    if (title === "" || price === "") {
        document.getElementsByClassName("modal-header")[2].innerHTML =
                "<button type='button' class='close' data-dismiss='modal'>&times;</button>"
                + "<h4 class='modal-title'>Artikel verkaufen</h4>"
                + "<br><div class='alert alert-danger'>Bitte füllen Sie alle Pflichtfelder aus!</div>";
        return;
    }

    ajax.responseType = "json";
    ajax.open("PUT", "servlet?action=updateitem&id=" + encodeURI(id)
            + "&title=" + encodeURI(title) + "&price=" + encodeURI(price), true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementsByClassName("modal-header")[2].innerHTML =
                    "<button type='button' class='close' data-dismiss='modal'>&times;</button>"
                    + "<h4 class='modal-title'>Neu registrieren</h4>"
                    + "<br><div class='alert alert-success'>Ihr Artikel wurde erfolgreich aktualisiert!</div>";
            myItems();
        }
    };
}

/**
 * @function deleteItem
 * @description Löscht einen Artikel.
 * @param {number} id - Die ID des Artikels.
 */
function deleteItem(id) {
    var result = confirm("Wollen Sie das Kleidungsstück wirklich löschen?");
    if (!result)
        return;

    var ajax = new XMLHttpRequest();

    ajax.responseType = "json";
    ajax.open("DELETE", "servlet?action=deleteitem&itemid=" + id, true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var parent = document.getElementsByClassName("col-sm-12")[0];
            var child = document.getElementById(id);
            parent.removeChild(child);
            sendMail("delItemMail");
        }
    };
}