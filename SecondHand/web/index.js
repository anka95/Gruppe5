function createNewCustomer() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var address = document.getElementById("address").value;
    var telephone = document.getElementById("telephone").value;
    var email = document.getElementById("email").value;
    var ajax = new XMLHttpRequest();
    
    ajax.responseType = "json";
    ajax.open("POST", "servlet?action=createnewcustomer&firstname=" + encodeURI(firstName) + "&lastname=" + encodeURI(lastName) + "&address=" + encodeURI(address) + "&telephone=" + encodeURI(telephone) + "&email=" + encodeURI(email), true);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementsByClassName("customers")[0].innerHTML = "Kunde erfolgreich angelegt.";
        }
    };
    
    document.getElementById("firstName").value="";
    document.getElementById("lastName").value="";
    document.getElementById("address").value="";
    document.getElementById("telephone").value="";
    document.getElementById("email").value="";
}

function createNewItem() {
    var customerId = document.getElementById("customerId").value;
    var category = document.getElementById("category").value;
    var brand = document.getElementById("brand").value;
    var dressSize = document.getElementById("dressSize").value;
    var price = document.getElementById("price").value;
    var ajax = new XMLHttpRequest();
    
    ajax.responseType = "json";
    ajax.open("POST", "servlet?action=createnewitem&customerid=" + encodeURI(customerId) + "&category=" + encodeURI(category) + "&brand=" + encodeURI(brand) + "&dresssize=" + encodeURI(dressSize) + "&price=" + encodeURI(price), true);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementsByClassName("items")[0].innerHTML = "Kleidungsstück erfolgreich angelegt.";
        }
    };
    
    document.getElementById("customerId").value="";
    document.getElementById("category").value="";
    document.getElementById("brand").value="";
    document.getElementById("dressSize").value="";
    document.getElementById("price").value="";
}

function findAllCustomers() {
    var ajax = new XMLHttpRequest();
    
    ajax.responseType = "json";
    ajax.open("GET", "servlet?action=findallcustomers", true);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            for (i=0; i<this.response.length; i++) {
                var newHTML = "<div class='customer' id='" + this.response[i].customerId + "'>"
                                + this.response[i].firstName
                                + this.response[i].lastName
                                + this.response[i].address
                                + this.response[i].telephone
                                + this.response[i].email
                            + "</div>";
            document.getElementsByClassName("customers")[0].innerHTML += newHTML;
            }
        }
    };
}
