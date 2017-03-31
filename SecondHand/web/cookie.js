/**
 * @file Alle Funktion für die Verarbeitung der Cookies.
 */

/**
 * @function setCookie
 * @description Platziert den Cookie.
 * @param {number} customerId - Die Kundennummer
 */
function setCookie(customerId) {
    var date = new Date();
    date = new Date(date.getTime() + 1000 * 60 * 60 * 24);
    document.cookie = 'customerId=' + customerId + '; expires=' + date.toGMTString() + ';';
}

/**
 * @function getCookie
 * @description Liefert den Inhalt des Cookies.
 * @returns {number} Die Kundennummer
 */
function getCookie() {
    var cookieValue = "";
    if (document.cookie) {
        date = document.cookie;
        if (date.indexOf(';') !== -1) {
            cookieWert = date.substring(date.indexOf('=') + 1, date.indexOf(';'));
        } else {
            cookieWert = date.substr(date.indexOf('=') + 1, date.length);
        }
    }
    return cookieWert;
}

/**
 * @function deleteCookie
 * @description Löscht den Cookie.
 */
function deleteCookie() {
    document.cookie = 'customerId=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    document.location.href = "/Gruppe5/SecondHand/";
}
