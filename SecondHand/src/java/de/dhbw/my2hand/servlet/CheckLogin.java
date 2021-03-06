package de.dhbw.my2hand.servlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import de.dhbw.my2hand.database.DatabaseFacade;
import de.dhbw.my2hand.jsonClasses.JsonLoginResponse;
import java.io.IOException;
import java.io.PrintWriter;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "CheckLogin", urlPatterns = {"/CheckLogin"})

public class CheckLogin extends HttpServlet {

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
        JsonLoginResponse jsonLoginResponse = new JsonLoginResponse();

        jsonLoginResponse.find = false;

        // Überprüfen, ob Passwort richtig eingegeben wurden und ob E-Mail-Adresse noch nicht registriert ist.
        for (int i = 0; i < database.findAllCustomers().size(); i++) {
            if (database.findAllCustomers().get(i).getPassword().equals(request.getParameter("pw"))
                    && database.findAllCustomers().get(i).getEmail().equals(request.getParameter("email"))) {
                jsonLoginResponse.customerId = database.findAllCustomers().get(i).getId();
                jsonLoginResponse.find = true;
            }
        }

        gson.toJson(jsonLoginResponse, toBrowser);
        toBrowser.flush();
    }
}
