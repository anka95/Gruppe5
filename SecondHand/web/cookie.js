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
    findItemsOfAllCustomers();
    var navigation = document.getElementById("feld");
    navigation.innerHTML = "<a onclick='showUserProfile()'>Profil</a>" +
            "<a onclick='login()'>Login</a>" +
            "<a onclick='myItems()'>My2Hand</a>" +
            "<a onclick='findItemsOfAllCustomers()'>Home</a>";

    var welcome = document.getElementById("willkommen");
    welcome.innerHTML = "Herzlich Willkommen";
}