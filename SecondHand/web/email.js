function sendContactMail() {
    var name = document.getElementsByName("name")[0].value;
    var subject = document.getElementsByName("subject")[0].value;
    var message = document.getElementsByName("message")[0].value;
    var ajax = new XMLHttpRequest();

    if (name === "" || subject === "" || message === "") {
        document.getElementsByClassName("modal-header")[3].innerHTML =
                "<button type='button' class='close' data-dismiss='modal'>&times;</button>"
                + "<h4 class='modal-title'>Kontaktformular</h4>"
                + "<br><div class='alert alert-danger'>Bitte füllen Sie alle Pflichtfelder aus!</div>";
        return;
    }

    ajax.responseType = "json";
    ajax.open("POST", "MailApp?action=sendContact&name=" + encodeURI(name)
            + "&subject=" + encodeURI(subject) + "&message=" + encodeURI(message), true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(ajax.response);
            if (ajax.response.status) {
                $('#contact').modal('hide');

                var x = document.getElementById("snackbar");
                x.className = "show";
                // After 3 seconds, remove the show class from DIV
                setTimeout(function () {
                    x.className = x.className.replace("show", "");
                }, 3000);

                document.getElementsByClassName("modal-header")[3].innerHTML =
                        "<button type='button' class='close' data-dismiss='modal'>&times;</button>"
                        + "<h4 class='modal-title'>Kontaktformular</h4>";
                document.getElementsByName("name")[0].value = "";
                document.getElementsByName("subject")[0].value = "";
                document.getElementsByName("message")[0].value = "";
            }
        }
    };
}


function sendRegisterMail(mail, name, subject) {
    var ajax = new XMLHttpRequest();
    ajax.responseType = "json";
    ajax.open("POST", "MailApp?action=sendRegister&mail=" + encodeURI(mail) 
        + "&name=" + encodeURI(name) + "&subject=" + encodeURI(subject), true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(ajax.response);
        }
    };
}

function sendRegisterMail(mail, name, subject) {
    var ajax = new XMLHttpRequest();
    ajax.responseType = "json";
    ajax.open("POST", "MailApp?action=sendRegister&mail=" + encodeURI(mail) 
        + "&name=" + encodeURI(name) + "&subject=" + encodeURI(subject), true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(ajax.response);
        }
    };
}

function addItemMail(mail, name, subject) {
    var ajax = new XMLHttpRequest();
    ajax.responseType = "json";
    ajax.open("POST", "MailApp?action=sendItem&mail=" + encodeURI(mail) 
        + "&name=" + encodeURI(name) + "&subject=" + encodeURI(subject), true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(ajax.response);
        }
    };
}

function delMail(mail, name, subject) {
    var ajax = new XMLHttpRequest();
    ajax.responseType = "json";
    ajax.open("POST", "MailApp?action=sendDeleteItemMail&mail=" + encodeURI(mail) 
        + "&name=" + encodeURI(name) + "&subject=" + encodeURI(subject), true);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(ajax.response);
        }
    };
}