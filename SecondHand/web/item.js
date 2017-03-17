function itemsCarousel() {
    var ajax = new XMLHttpRequest();

    ajax.responseType = "json";
    ajax.open("GET", "servlet?action=finditemsofallcustomers", true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(ajax.response);
            for (i = 0; i < 5; i++) {
                document.getElementsByClassName("item")[i].innerHTML =
                        "<img class='carousel-image' src='" + ajax.response[i].imagePath + "' alt='" + ajax.response[i].title + "'>"
                        + "<div class='carousel-text'>"
                        + "<h2>" + ajax.response[i].title + "</h2>"
                        + "<p class='category'>" + ajax.response[i].categoryName + "</p>"
                        + "<p>" + ajax.response[i].personTypeName + " • " + ajax.response[i].locationPlace + "</p>"
                        + "<p>Größe: " + ajax.response[i].dressSizeName + "</p>"
                        + "<p><b>" + ajax.response[i].price + " €</b></p>"
                        + "</div>";
            }
        }
    };
}

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
    };
}

function createFilter() {
    var ajax = new XMLHttpRequest();

    ajax.responseType = "json";
    ajax.open("POST", "CreateSelection");
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(ajax.response);
            var location = "";
            for (var i = 0; i < ajax.response.loc.length; i++) {
                location += "<input type='radio' name='standort' VALUE = '" + ajax.response.loc[i].id + "'>" + ajax.response.loc[i].place + "</br>";
            }
            var cat = "";
            for (var i = 0; i < ajax.response.cat.length; i++) {
                cat += "<input type='radio' name='kategorie' VALUE = '" + ajax.response.cat[i].id + "'>" + ajax.response.cat[i].category + "</br>";
            }

            var person = "";
            for (var i = 0; i < ajax.response.persontype.length; i++) {
                person += "<input type='radio' name='abteilung' VALUE = '" + ajax.response.persontype[i].id + "'>" + ajax.response.persontype[i].personType + "</br>";
            }

            var size = "";
            for (var i = 0; i < ajax.response.size.length; i++) {
                size += "<input type='radio' name='groessen' VALUE = '" + ajax.response.size[i].id + "'>" + ajax.response.size[i].dressSize + "</br>";
            }

            document.getElementsByClassName("col-sm-2")[1].innerHTML =
                    "<form class='filter'>"
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
                    + "<input type='button' name='submit' value='Filtern' onClick='sellArticles()'/>"
                    + "</form>";
        }
    };
}

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
}

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
                if (ajax.response.items[i].published) {
                    var published = "<span class='published label label-success'>veröffentlicht</span>";
                } else {
                    var published = "<span class='published label label-warning'>nicht veröffentlicht</span>";
                }

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
                        + published
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
}

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
            for (var i = 0; i < ajax.response.loc.length; i++) {
                location += "<option VALUE = '" + ajax.response.loc[i].id + "'>" + ajax.response.loc[i].place + "</option>";
            }

            var cat = "<option VALUE = '0' >-Bitte auswählen-</option>";
            for (var i = 0; i < ajax.response.cat.length; i++) {
                cat += "<option VALUE = '" + ajax.response.cat[i].id + "'>" + ajax.response.cat[i].category + "</option>";
            }

            var person = "<option VALUE = '0' >-Bitte auswählen-</option>";
            for (var i = 0; i < ajax.response.persontype.length; i++) {
                person += "<option VALUE = '" + ajax.response.persontype[i].id + "'>" + ajax.response.persontype[i].personType + "</option>";
            }

            var size = "<option VALUE = '0' >-Bitte auswählen-</option>";
            for (var i = 0; i < ajax.response.size.length; i++) {
                size += "<option VALUE = '" + ajax.response.size[i].id + "'>" + ajax.response.size[i].dressSize + "</option>";
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
    
    ajax.responseType = "json";
    ajax.open("GET", "servlet?action=getEmail&customerid=" + getCookie(), true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(ajax.response);
            var name = ajax.response.cust.firstName + " " + ajax.response.cust.lastName;
            var mail = ajax.response.cust.email;
            var subject = "Ihr Artikel wurde angelegt!";
            
            sendItemMail(mail, name, subject);
        }
    };
}

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
        var actionString = "servlet?action=createnewitem&customerid=" + encodeURI(getCookie())
                + "&locationid=" + encodeURI(locationId) + "&title=" + encodeURI(title)
                + "&categoryid=" + encodeURI(categoryId) + "&dresssizeid=" + encodeURI(dressSizeId)
                + "&price=" + encodeURI(price) + "&persontypeid=" + encodeURI(personTypeId);
        document.getElementById("formItems").setAttribute("action", actionString);
    }
}

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
}

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
    ajax.open("POST", "servlet?action=updateitem&id=" + encodeURI(id)
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
            var parent = document.getElementsByClassName("col-sm-12")[0];
            var child = document.getElementById(id);
            parent.removeChild(child);
        }
    };
}