function sendContactMail() {
    
    var name = document.getElementsByName("name")[0].value;
    var subject = document.getElementsByName("subject")[0].value;
    var message = document.getElementsByName("message")[0].value;

    var ajax = new XMLHttpRequest();
    ajax.open("POST", "MailApp?action=sendContact&name=" + encodeURI(name)
            + "&subject=" + encodeURI(subject) + "&message=" + encodeURI(message), true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if(ajax.response.antwort) {
                document.getElementsByName("kontaktformular")[0].innerHTML = 
                "<br><textarea>Mail versendet!</textarea>";
            }
        }
    };
}