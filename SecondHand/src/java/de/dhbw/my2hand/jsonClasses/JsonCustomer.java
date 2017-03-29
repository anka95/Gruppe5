package de.dhbw.my2hand.jsonClasses;

import java.util.List;

public class JsonCustomer {

    public Long customerId;
    public String salutation, firstName, lastName, street, houseNumber, plz,
            place, iban, bic, bank, telephone, email, password;
    public List<JsonItem> items;
}
