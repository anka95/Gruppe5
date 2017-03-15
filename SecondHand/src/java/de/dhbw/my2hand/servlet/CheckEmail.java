package de.dhbw.my2hand.servlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import de.dhbw.my2hand.database.Customer;
import de.dhbw.my2hand.database.DatabaseFacade;
import java.io.IOException;
import java.io.PrintWriter;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "CheckEmail", urlPatterns = {"/CheckEmail"})

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

        Gson gson = new GsonBuilder().create();
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
                    if (database.findAllCustomers().get(i).getEmail().equals(request.getParameter("email"))) {
                        antwort.vorhanden = true;
                        break;
                    }
                }

                if (!antwort.vorhanden) {
                    antwort.c = database.createNewCustomer(request.getParameter("salutation"), request.getParameter("firstName"), request.getParameter("lastName"),
                            request.getParameter("street"), request.getParameter("houseNumber"), request.getParameter("plz"),
                            request.getParameter("place"), request.getParameter("iban"), request.getParameter("bic"), request.getParameter("bank"),
                            request.getParameter("telephone"), request.getParameter("email"), request.getParameter("password"));
                }
                gson.toJson(antwort, toBrowser);
                toBrowser.flush();

                break;

            case "updateprofile":
                for (int i = 0; i < database.findAllCustomers().size(); i++) {
                    if (database.findAllCustomers().get(i).getEmail().equals(request.getParameter("email"))
                            && !database.findAllCustomers().get(i).getId().equals(new Long(request.getParameter("customerid")))) {
                        antwort.vorhanden = true;
                        break;
                    }
                }

                if (!antwort.vorhanden) {
                    antwort.c = database.findCustomer(new Long(request.getParameter("customerid")));
                    antwort.c.setSalutation(request.getParameter("salutation"));
                    antwort.c.setFirstName(request.getParameter("firstName"));
                    antwort.c.setLastName(request.getParameter("lastName"));
                    antwort.c.setStreet(request.getParameter("street"));
                    antwort.c.setHouseNumber(request.getParameter("houseNumber"));
                    antwort.c.setPLZ(request.getParameter("plz"));
                    antwort.c.setPlace(request.getParameter("place"));
                    antwort.c.setIban(request.getParameter("iban"));
                    antwort.c.setBic(request.getParameter("bic"));
                    antwort.c.setBank(request.getParameter("bank"));
                    antwort.c.setTelephone(request.getParameter("telephone"));
                    antwort.c.setEmail(request.getParameter("email"));
                    antwort.c.setPassword(request.getParameter("password"));
                    database.save(antwort.c);
                }
                gson.toJson(antwort, toBrowser);
                toBrowser.flush();

                break;
        }
    }
}

class jsonEmailAntwort {

    public boolean vorhanden;
    public Customer c;
}
