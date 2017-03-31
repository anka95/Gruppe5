package de.dhbw.my2hand.servlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import de.dhbw.my2hand.jsonClasses.*;

@WebServlet(name = "MailApp", urlPatterns = {"/MailApp"})

public class MailApp extends HttpServlet {

    private Gson gson = new GsonBuilder().create();
    JsonStatus resp = new JsonStatus();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Sonderzeichen richtig erkennen!
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");

        response.setContentType("application/json");        // SONST ERKENNT DER BROWSER NICHT
        PrintWriter toBrowser = response.getWriter();       // DASS WIR IHM JSON SCHICKEN!

        String action = request.getParameter("action");
        if (action == null) {
            action = "";
        }

        switch (action) {
            case "sendContact":
                // Sendet Kontaktmail.
                String to = "team%service.2-hand@gmx.de";
                String name = request.getParameter("name");
                String subject = request.getParameter("subject");
                String message = "Gesendet von: " + name + " \n Nachricht: " + request.getParameter("message");
                String user = "service.2-hand@gmx.de";
                String pass = "mailiese";

                try {
                    SendMail.send(to, subject, message, user, pass);
                    resp.status = true;
                } catch (Exception ex) {
                    ex.printStackTrace();
                    resp.status = false;
                } finally {
                    gson.toJson(resp, toBrowser);
                    toBrowser.flush();
                }
                break;

            case "sendRegister":
                // Sendet E-Mail bei Registrierung.
                to = request.getParameter("mail");
                name = request.getParameter("name");
                subject = request.getParameter("subject");
                message = "Hallo " + name + "! \n \n Sie sind nun auf My2Hand angemeldet und können loslegen! :) \n \n Viel Spaß wünscht Ihnen My2Hand.";
                user = "service.2-hand@gmx.de";
                pass = "mailiese";

                try {
                    SendMail.send(to, subject, message, user, pass);
                    resp.status = true;
                } catch (Exception ex) {
                    ex.printStackTrace();
                    resp.status = false;
                } finally {
                    gson.toJson(resp, toBrowser);
                    toBrowser.flush();
                }
                break;

            case "sendItem":
                // Sendet E-Mail beim Anlegen eine Artikels.
                to = request.getParameter("mail");
                name = request.getParameter("name");
                subject = request.getParameter("subject");
                message = "Hallo " + name + "! \n \n Sie haben einen neuen Artikel angelegt. Um diesen Artikel zum Verkauf freizugeben, \n bitten wir Sie, das Kleidungsstück in die von Ihnen gewünschte Filiale zu bringen.\n \n Vielen Dank! \n\n Ihr My2Hand-Team.";
                user = "service.2-hand@gmx.de";
                pass = "mailiese";

                try {
                    SendMail.send(to, subject, message, user, pass);
                    resp.status = true;
                } catch (Exception ex) {
                    ex.printStackTrace();
                    resp.status = false;
                } finally {
                    gson.toJson(resp, toBrowser);
                    toBrowser.flush();
                }
                break;

            case "sendDeleteItemMail":
                // Sendet E-Mail beim Löschen eines Artikels.
                to = request.getParameter("mail");
                name = request.getParameter("name");
                subject = request.getParameter("subject");
                message = "Hallo " + name + "! \n \n Sie haben einen Artikel gelöscht. Sie haben die Möglichkeit Ihren Artikel in Ihrer Heimatfiliale abzuholen. \n Sollte dies nicht innerhalb von 2 Wochen erfolgen, \n behalten wir uns vor, Ihren Artikel an die von Ihnen angegebene Adresse gegen einen Aufpreis zu versenden. \n\n Ihr My2Hand-Team.";
                user = "service.2-hand@gmx.de";
                pass = "mailiese";

                try {
                    SendMail.send(to, subject, message, user, pass);
                    resp.status = true;
                } catch (Exception ex) {
                    ex.printStackTrace();
                    resp.status = false;
                } finally {
                    gson.toJson(resp, toBrowser);
                    toBrowser.flush();
                }
                break;

            case "sendDeleteProfileMail":
                // Sendet E-Mail beim Löschen eines Kundenkontos.
                to = request.getParameter("mail");
                name = request.getParameter("name");
                subject = request.getParameter("subject");
                message = "Hallo " + name + "! \n \n Hiermit wird die Löschung Ihres Profils bestätigt. Sollten sie noch Artikel in der/den Filiale/n haben, haben Sie die Möglichkeit, Ihren Artikel in Ihrer Heimatfiliale abzuholen. \n Sollte dies nicht innerhalb von 2 Wochen erfolgen, \n behalten wir uns vor, Ihren Artikel an die von Ihnen angegebene Adresse gegen einen Aufpreis zu versenden. \n Ihre Adresse wird selbstverständlich nach diesem Vorgang gelöscht. \n\n Ihr My2Hand-Team.";
                user = "service.2-hand@gmx.de";
                pass = "mailiese";

                try {
                    SendMail.send(to, subject, message, user, pass);
                    resp.status = true;
                } catch (Exception ex) {
                    ex.printStackTrace();
                    resp.status = false;
                } finally {
                    gson.toJson(resp, toBrowser);
                    toBrowser.flush();
                }
        }
    }
}


