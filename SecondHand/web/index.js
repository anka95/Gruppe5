/**
 * @file Alle Funktion der Startseite.
 */

/**
 * @function showImpressum
 * @description Erzeugt das Impressum.
 */
function showImpressum() {
    document.getElementsByClassName("row")[1].innerHTML = "<div class='col-sm-2'></div><div class='col-sm-8'></div><div class='col-sm-2'></div>";
    document.getElementsByClassName("row")[2].innerHTML = "";
    document.getElementsByClassName("row")[3].innerHTML = "";
    document.getElementsByClassName("col-sm-8")[0].innerHTML =
            "<h1>Impressum</h1><h3> Angaben gemäß § 5 TMG:</h3> <p>My2Hand <br /> Erzbergerstra&szlig;e 121<br /> 76133 Karlsruhe</p>"
            + "<h3>Kontakt:</h3><p>Telefon: 0721 123456<br/>E-Mail: service.2-hand@gmx.de</p><BR/>"
            + "<h1>Haftungsausschluss (Disclaimer)</h1> <h3>Haftung f&uuml;r Inhalte</h1>"
            + "<p>Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs.1 TMG f&uuml;r eigene Inhalte auf diesen Seiten nach den allgemeinen"
            + "Gesetzen verantwortlich. Nach &sect;&sect; 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet,"
            + "&uuml;bermittelte oder gespeicherte fremde Informationen zu &uuml;berwachen oder nach Umst&auml;nden zu"
            + "forschen, die auf eine rechtswidrige T&auml;tigkeit hinweisen.</p> <p>Verpflichtungen zur Entfernung oder"
            + "Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unber&uuml;hrt. Eine"
            + "diesbez&uuml;gliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung"
            + "m&ouml;glich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend"
            + "entfernen.</p>"
            + "<h3>Haftung f&uuml;r Links</h3>"
            + "<p>Unser Angebot enth&auml;lt Links zu externen Webseiten"
            + "Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb k&ouml;nnen wir f&uuml;r diese fremden Inhalte"
            + "auch keine Gew&auml;hr &uuml;bernehmen. F&uuml;r die Inhalte der verlinkten Seiten ist stets der jeweilige"
            + "Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf"
            + "m&ouml;gliche Rechtsverst&ouml;&szlig;e &uuml;berpr&uuml;ft. Rechtswidrige Inhalte waren zum Zeitpunkt der"
            + "Verlinkung nicht erkennbar.</p> <p>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne"
            + "konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen"
            + "werden wir derartige Links umgehend entfernen.</p>"
            + "<h3>Urheberrecht</h3>"
            + "<p>Die durch die Seitenbetreiber"
            + "erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die"
            + "Vervielf&auml;ltigung, Bearbeitung, Verbreitung und jede Art der Verwertung au&szlig;erhalb der Grenzen des"
            + "Urheberrechtes bed&uuml;rfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads"
            + "und Kopien dieser Seite sind nur f&uuml;r den privaten, nicht kommerziellen Gebrauch gestattet.</p> <p>Soweit"
            + "die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet."
            + "Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine"
            + "Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden"
            + "von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>"
            + "<h3>Datenschutz</h3>"
            + "<p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer pers&ouml;nlichen Daten sehr"
            + "ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen"
            + "Datenschutzvorschriften sowie dieser Datenschutzerkl&auml;rung.</p> <p>Die Nutzung unserer Webseite ist in"
            + "der Regel ohne Angabe personenbezogener Daten m&ouml;glich. Soweit auf unseren Seiten"
            + "personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies,"
            + "soweit m&ouml;glich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdr&uuml;ckliche Zustimmung"
            + "nicht an Dritte weitergegeben.</p> <p>Wir weisen darauf hin, dass die Daten&uuml;bertragung im Internet (z.B."
            + "bei der Kommunikation per E-Mail) Sicherheitsl&uuml;cken aufweisen kann. Ein l&uuml;ckenloser Schutz der"
            + "Daten vor dem Zugriff durch Dritte ist nicht m&ouml;glich.</p>"
            + "<h3>Cookies</h3>"
            + "<p>Die"
            + "Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an"
            + "und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu"
            + "machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser"
            + "speichert.</p> <p>Die meisten der von uns verwendeten Cookies sind so genannte „Session-Cookies“. Sie"
            + "werden nach Ende Ihres Besuchs automatisch gel&ouml;scht. Andere Cookies bleiben auf Ihrem Endger&auml;t"
            + "gespeichert, bis Sie diese l&ouml;schen. Diese Cookies erm&ouml;glichen es uns, Ihren Browser beim"
            + "n&auml;chsten Besuch wiederzuerkennen.</p> <p>Sie k&ouml;nnen Ihren Browser so einstellen, dass Sie"
            + "&uuml;ber das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von"
            + "Cookies f&uuml;r bestimmte F&auml;lle oder generell ausschlie&szlig;en sowie das automatische L&ouml;schen"
            + "der Cookies beim Schlie&szlig;en des Browser aktivieren. Bei der Deaktivierung von Cookies kann die"
            + "Funktionalit&auml;t dieser Website eingeschr&auml;nkt sein.</p>"
            + "<h3>Auskunft, L&ouml;schung, Sperrung</h3>"
            + "<p>Sie haben jederzeit das Recht auf unentgeltliche Auskunft &uuml;ber Ihre gespeicherten"
            + "personenbezogenen Daten, deren Herkunft und Empf&auml;nger und den Zweck der Datenverarbeitung sowie"
            + "ein Recht auf Berichtigung, Sperrung oder L&ouml;schung dieser Daten. Hierzu sowie zu weiteren Fragen zum"
            + "Thema personenbezogene Daten k&ouml;nnen Sie sich jederzeit unter der im Impressum angegebenen"
            + "Adresse an uns wenden.</p><br/><br/>"
            + "<div class='col-sm-2'></div>";

    document.getElementsByClassName("row")[2].innerHTML = " ";
    document.getElementsByClassName("row")[3].innerHTML = " ";
}

// To-Top-Button
$(document).ready(function () {

    // Der Button wird mit JavaScript erzeugt und vor dem Ende des body eingebunden.
    var back_to_top_button = ['<a href="#top" class="back-to-top">Nach oben</a>'].join("");
    $("body").append(back_to_top_button)

    // Der Button wird ausgeblendet
    $(".back-to-top").hide();

    // Funktion für das Scroll-Verhalten
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) { // Wenn 100 Pixel gescrolled wurde
                $('.back-to-top').fadeIn();
            } else {
                $('.back-to-top').fadeOut();
            }
        });

        $('.back-to-top').click(function () { // Klick auf den Button
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });

});