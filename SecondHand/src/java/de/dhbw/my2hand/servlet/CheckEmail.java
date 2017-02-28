package de.dhbw.my2hand.servlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import de.dhbw.my2hand.database.Customer;
import de.dhbw.my2hand.database.DatabaseFacade;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(
        name = "CheckEmail",
        urlPatterns = "/CheckEmail"
)

public class CheckEmail extends HttpServlet {

    @EJB
    private DatabaseFacade database;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Sonderzeichen richtig erkennen!
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");

        response.setContentType("application/json");        // SONST ERKENNT DER BROWSER NICHT
        PrintWriter toBrowser = response.getWriter();       // DASS WIR IHM JSON SCHICKEN!

        BufferedReader fromBrowser = new BufferedReader(new InputStreamReader(request.getInputStream()));

        Gson gson = new GsonBuilder().create();

        jsonEmail anfrage = gson.fromJson(fromBrowser, jsonEmail.class);
        jsonEmailAntwort antwort = new jsonEmailAntwort();

        antwort.vorhanden = false;

        // Angeforderte Datenbankaktion ausführen
        String action = request.getParameter("action");
        if (action == null) {
            action = "";
        }

        switch (action) {
            case "createnewcustomer":
                for (int i = 0; i < database.findAllCustomers().size(); i++) {
                    if (database.findAllCustomers().get(i).getEmail().equals(anfrage.email)) {
                        antwort.vorhanden = true;
                        break;
                    }
                }

                if (antwort.vorhanden == false) {
                    antwort.c = database.createNewCustomer(anfrage.salutation, anfrage.firstName, anfrage.lastName,
                            anfrage.street, anfrage.houseNumber, anfrage.plz,
                            anfrage.place, anfrage.iban, anfrage.bic, anfrage.bank,
                            anfrage.telephone, anfrage.email, anfrage.password);
                }
                gson.toJson(antwort, toBrowser);
                toBrowser.flush();

                break;

            case "updateprofile":
                for (int i = 0; i < database.findAllCustomers().size(); i++) {
                    if (database.findAllCustomers().get(i).getEmail().equals(anfrage.email)
                            && !database.findAllCustomers().get(i).getId().equals(new Long(anfrage.customerId))) {
                        antwort.vorhanden = true;
                        break;
                    }
                }

                if (antwort.vorhanden == false) {
                    antwort.c = database.findCustomer(new Long(anfrage.customerId));
                    antwort.c.setSalutation(anfrage.salutation);
                    antwort.c.setFirstName(anfrage.firstName);
                    antwort.c.setLastName(anfrage.lastName);
                    antwort.c.setStreet(anfrage.street);
                    antwort.c.setHouseNumber(anfrage.houseNumber);
                    antwort.c.setPLZ(anfrage.plz);
                    antwort.c.setPlace(anfrage.place);
                    antwort.c.setIban(anfrage.iban);
                    antwort.c.setBic(anfrage.bic);
                    antwort.c.setBank(anfrage.bank);
                    antwort.c.setTelephone(anfrage.telephone);
                    antwort.c.setEmail(anfrage.email);
                    antwort.c.setPassword(anfrage.password);
                    database.save(antwort.c);
                }
                gson.toJson(antwort, toBrowser);
                toBrowser.flush();

                break;
        }
    }
}

class jsonEmail {

    public String customerId, email, salutation, firstName, lastName, street, houseNumber,
            plz, place, iban, bic, bank, telephone, password;
}

class jsonEmailAntwort {

    public Boolean vorhanden;
    public Customer c;
}
