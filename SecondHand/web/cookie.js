function setCookie(customerId) {
    var a = new Date();
    a = new Date(a.getTime() + 1000 * 60 * 60 * 24);
    document.cookie = 'customerId=' + customerId + '; expires=' + a.toGMTString() + ';';
}

function getCookie() {
    var cookieWert = "";
    if (document.cookie) {
        a = document.cookie;
        if (a.indexOf(';') !== -1) {
            cookieWert = a.substring(a.indexOf('=') + 1, a.indexOf(';'));
        } else {
            cookieWert = a.substr(a.indexOf('=') + 1, a.length);
        }
    }
    return cookieWert;
}

function deleteCookie() {
    document.cookie = 'customerId=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    document.location.href = "/Gruppe5/SecondHand/";
}