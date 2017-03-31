package de.dhbw.my2hand.servlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import de.dhbw.my2hand.database.DatabaseFacade;
import de.dhbw.my2hand.jsonClasses.JsonEmailResponse;
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
    private Gson gson = new GsonBuilder().create();
    private JsonEmailResponse jsonEmailResponse = new JsonEmailResponse();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Sonderzeichen richtig erkennen!
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");

        response.setContentType("application/json");        // SONST ERKENNT DER BROWSER NICHT
        PrintWriter toBrowser = response.getWriter();       // DASS WIR IHM JSON SCHICKEN!

        jsonEmailResponse.available = false;

        // Neuen Kunden anlegen
        for (int i = 0; i < database.findAllCustomers().size(); i++) {
            if (database.findAllCustomers().get(i).getEmail().equals(request.getParameter("email"))) {
                jsonEmailResponse.available = true;
                break;
            }
        }

        if (!jsonEmailResponse.available) {
            jsonEmailResponse.customer = database.createNewCustomer(request.getParameter("salutation"), request.getParameter("firstName"), request.getParameter("lastName"),
                    request.getParameter("street"), request.getParameter("houseNumber"), request.getParameter("plz"),
                    request.getParameter("place"), request.getParameter("iban"), request.getParameter("bic"), request.getParameter("bank"),
                    request.getParameter("telephone"), request.getParameter("email"), request.getParameter("password"));
        }
        gson.toJson(jsonEmailResponse.available, toBrowser);
        toBrowser.flush();
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Sonderzeichen richtig erkennen!
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");

        response.setContentType("application/json");        // SONST ERKENNT DER BROWSER NICHT
        PrintWriter toBrowser = response.getWriter();       // DASS WIR IHM JSON SCHICKEN!

        jsonEmailResponse.available = false;

        // Profil aktualisieren
        for (int i = 0; i < database.findAllCustomers().size(); i++) {
            if (database.findAllCustomers().get(i).getEmail().equals(request.getParameter("email"))
                    && !database.findAllCustomers().get(i).getId().equals(new Long(request.getParameter("customerid")))) {
                jsonEmailResponse.available = true;
                break;
            }
        }

        if (!jsonEmailResponse.available) {
            jsonEmailResponse.customer = database.findCustomer(new Long(request.getParameter("customerid")));
            jsonEmailResponse.customer.setSalutation(request.getParameter("salutation"));
            jsonEmailResponse.customer.setFirstName(request.getParameter("firstName"));
            jsonEmailResponse.customer.setLastName(request.getParameter("lastName"));
            jsonEmailResponse.customer.setStreet(request.getParameter("street"));
            jsonEmailResponse.customer.setHouseNumber(request.getParameter("houseNumber"));
            jsonEmailResponse.customer.setPLZ(request.getParameter("plz"));
            jsonEmailResponse.customer.setPlace(request.getParameter("place"));
            jsonEmailResponse.customer.setIban(request.getParameter("iban"));
            jsonEmailResponse.customer.setBic(request.getParameter("bic"));
            jsonEmailResponse.customer.setBank(request.getParameter("bank"));
            jsonEmailResponse.customer.setTelephone(request.getParameter("telephone"));
            jsonEmailResponse.customer.setEmail(request.getParameter("email"));
            jsonEmailResponse.customer.setPassword(request.getParameter("password"));
            database.save(jsonEmailResponse.customer);
        }
        gson.toJson(jsonEmailResponse.available, toBrowser);
        toBrowser.flush();
    }
}
