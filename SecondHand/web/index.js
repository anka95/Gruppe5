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

function showImpressum() {
document.getElementsByClassName("col-sm-8")[0].innerHTML =
        "<h1>Impressum</h1><h3> Angaben gemäß § 5 TMG:</h3> <p>My2Hand <br /> Erzbergerstra&szlig;e 121<br /> 76133 Karlsruhe</p>"
        +"<h3>Kontakt:</h3><p>Telefon: 0721 123456<br/>E-Mail: service.2-hand@gmx.de</p><BR/>"
        +"<h1>Haftungsausschluss (Disclaimer)</h1> <h3>Haftung f&uuml;r Inhalte</h1>"
        + "<p>Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs.1 TMG f&uuml;r eigene Inhalte auf diesen Seiten nach den allgemeinen"
        +"Gesetzen verantwortlich. Nach &sect;&sect; 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,"
        +"&uuml;bermittelte oder gespeicherte fremde Informationen zu &uuml;berwachen oder nach Umst&auml;nden zu"
        +"forschen, die auf eine rechtswidrige T&auml;tigkeit hinweisen.</p> <p>Verpflichtungen zur Entfernung oder"
        +"Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unber&uuml;hrt. Eine"
        +"diesbez&uuml;gliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung"
        +"m&ouml;glich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend"
        +"entfernen.</p>"
        +"<h3>Haftung f&uuml;r Links</h3>"
        +"<p>Unser Angebot enth&auml;lt Links zu externen Webseiten"
        +"Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb k&ouml;nnen wir f&uuml;r diese fremden Inhalte"
        +"auch keine Gew&auml;hr &uuml;bernehmen. F&uuml;r die Inhalte der verlinkten Seiten ist stets der jeweilige"
        +"Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf"
        +"m&ouml;gliche Rechtsverst&ouml;&szlig;e &uuml;berpr&uuml;ft. Rechtswidrige Inhalte waren zum Zeitpunkt der"
        +"Verlinkung nicht erkennbar.</p> <p>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne"
        +"konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen"
        +"werden wir derartige Links umgehend entfernen.</p>"
        +"<h3>Urheberrecht</h3>"
        +"<p>Die durch die Seitenbetreiber"
        +"erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die"
        +"Vervielf&auml;ltigung, Bearbeitung, Verbreitung und jede Art der Verwertung au&szlig;erhalb der Grenzen des"
        +"Urheberrechtes bed&uuml;rfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads"
        +"und Kopien dieser Seite sind nur f&uuml;r den privaten, nicht kommerziellen Gebrauch gestattet.</p> <p>Soweit"
        +"die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet."
        +"Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine"
        +"Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden"
        +"von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>"
        +"<h3>Datenschutz</h3>"
        +"<p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer pers&ouml;nlichen Daten sehr"
        +"ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen"
        +"Datenschutzvorschriften sowie dieser Datenschutzerkl&auml;rung.</p> <p>Die Nutzung unserer Webseite ist in"
        +"der Regel ohne Angabe personenbezogener Daten m&ouml;glich. Soweit auf unseren Seiten"
        +"personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies,"
        +"soweit m&ouml;glich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdr&uuml;ckliche Zustimmung"
        +"nicht an Dritte weitergegeben.</p> <p>Wir weisen darauf hin, dass die Daten&uuml;bertragung im Internet (z.B."
        +"bei der Kommunikation per E-Mail) Sicherheitsl&uuml;cken aufweisen kann. Ein l&uuml;ckenloser Schutz der"
        +"Daten vor dem Zugriff durch Dritte ist nicht m&ouml;glich.</p>"  
        +"<h3>Cookies</h3>"
        +"<p>Die"
        +"Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an"
        +"und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu"
        +"machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser"
        +"speichert.</p> <p>Die meisten der von uns verwendeten Cookies sind so genannte „Session-Cookies“. Sie"
        +"werden nach Ende Ihres Besuchs automatisch gel&ouml;scht. Andere Cookies bleiben auf Ihrem Endger&auml;t"
        +"gespeichert, bis Sie diese l&ouml;schen. Diese Cookies erm&ouml;glichen es uns, Ihren Browser beim"
        +"n&auml;chsten Besuch wiederzuerkennen.</p> <p>Sie k&ouml;nnen Ihren Browser so einstellen, dass Sie"
        +"&uuml;ber das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von"
        +"Cookies f&uuml;r bestimmte F&auml;lle oder generell ausschlie&szlig;en sowie das automatische L&ouml;schen"
        +"der Cookies beim Schlie&szlig;en des Browser aktivieren. Bei der Deaktivierung von Cookies kann die"
        +"Funktionalit&auml;t dieser Website eingeschr&auml;nkt sein.</p>"
        +"<h3>Auskunft, L&ouml;schung, Sperrung</h3>"
        +"<p>Sie haben jederzeit das Recht auf unentgeltliche Auskunft &uuml;ber Ihre gespeicherten"
        +"personenbezogenen Daten, deren Herkunft und Empf&auml;nger und den Zweck der Datenverarbeitung sowie"
        +"ein Recht auf Berichtigung, Sperrung oder L&ouml;schung dieser Daten. Hierzu sowie zu weiteren Fragen zum"
        +"Thema personenbezogene Daten k&ouml;nnen Sie sich jederzeit unter der im Impressum angegebenen"
        +"Adresse an uns wenden.</p><br/><br/>"
        +"<div class='col-sm-2'></div>";

document.getElementsByClassName("row")[2].innerHTML = " ";
document.getElementsByClassName("row")[3].innerHTML = " ";
};