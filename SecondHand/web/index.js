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
    } else {
        if (document.getElementsByName("standort")[1].checked) {
            standort = document.getElementsByName("standort")[1].value;
        }              //Berlin
        else {
            if (document.getElementsByName("standort")[2].checked) {
                standort = document.getElementsByName("standort")[2].value;
            }          //München
            else {
                if (document.getElementsByName("standort")[3].checked) {
                    standort = document.getElementsByName("standort")[3].value;
                }      //Hamburg
            }
        }
        salutation = document.getElementsByName("standort")[4].value;               //Köln
    }

    if (document.getElementsByName("kategorie")[0].checked) {
        kategorie = document.getElementsByName("kategorie")[0].value;             //Hosen
    } else {
        if (document.getElementsByName("kategorie")[1].checked) {
            kategorie = document.getElementsByName("kategorie")[1].value;
        } else {
            if (document.getElementsByName("kategorie")[2].checked) {
                kategorie = document.getElementsByName("kategorie")[2].value;
            } else {
                if (document.getElementsByName("kategorie")[3].checked) {
                    kategorie = document.getElementsByName("kategorie")[3].value;
                } else {
                    if (document.getElementsByName("kategorie")[4].checked) {
                        kategorie = document.getElementsByName("kategorie")[4].value;
                    } else {
                        if (document.getElementsByName("kategorie")[5].checked) {
                            kategorie = document.getElementsByName("kategorie")[5].value;
                        } else {
                            if (document.getElementsByName("kategorie")[6].checked) {
                                kategorie = document.getElementsByName("kategorie")[6].value;
                            } else {
                                if (document.getElementsByName("kategorie")[7].checked) {
                                    kategorie = document.getElementsByName("kategorie")[7].value;
                                } else {
                                    if (document.getElementsByName("kategorie")[8].checked) {
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
    } else {
        if (document.getElementsByName("abteilung")[1].checked) {
            abteilung = document.getElementsByName("abteilung")[1].value;
        }              //Frauen
        else {
            if (document.getElementsByName("abteilung")[2].checked) {
                abteilung = document.getElementsByName("abteilung")[2].value;
            }          //Mädchne
            else {
                if (document.getElementsByName("abteilung")[3].checked) {
                    abteilung = document.getElementsByName("abteilung")[3].value;
                }      //Jungen
            }
        }
        abteilung = document.getElementsByName("abteilung")[4].value;                  //Babys
    }

    if (document.getElementsByName("groessen")[0].checked) {
        groessen = document.getElementsByName("groessen")[0].value;             //XS
    } else {
        if (document.getElementsByName("groessen")[1].checked) {
            groessen = document.getElementsByName("groessen")[1].value;             //S
        } else {
            if (document.getElementsByName("groessen")[2].checked) {
                groessen = document.getElementsByName("groessen")[2].value;         //M
            } else {
                if (document.getElementsByName("groessen")[3].checked) {
                    groessen = document.getElementsByName("groessen")[3].value;     //L
                } else {
                    if (document.getElementsByName("groessen")[4].checked) {
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
    ajax.addEventListener("load", function () {
        console.log(ajax.response);

        for (i = 0; i == 10; i++) {
            var content = document.getElementById("content");
            content.innerHTML = "<div class='Artikel'>" +
                    "<img src='Artikel_img/A1B1.jpg' alt=" + titel + "/>" +
                    "<p>heißes Dirndel</p>" +
                    "<div class='size'> <a>S/36</a> </div>" +
                    "<div class='preis'> <a><u>" + preis + "</u></a></div>" +
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