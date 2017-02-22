package de.dhbw.my2hand.servlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
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
            name = "CheckLogin", 
            urlPatterns = "/CheckLogin"
)

public class CheckLogin extends HttpServlet {
    @EJB 
    private DatabaseFacade database;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        // Sonderzeichen richtig erkennen!
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");

        BufferedReader fromBrowser = new BufferedReader(new InputStreamReader(request.getInputStream()));

        Gson gson = new GsonBuilder().create();

        jsonLogin anfrage = gson.fromJson(fromBrowser, jsonLogin.class);  
        jsonLogin_ant antwort = new jsonLogin_ant();

        antwort.find = false;

        for(int i = 0; i < database.findAllCustomers().size(); i++ ){
            if(database.findAllCustomers().get(i).getPassword().equals(anfrage.pw) 
                    && database.findAllCustomers().get(i).getEmail().equals(anfrage.mail))
            {
                antwort.kunr = database.findAllCustomers().get(i).getId();
                antwort.name = database.findAllCustomers().get(i).getLastName();
                antwort.vorname = database.findAllCustomers().get(i).getFirstName();
                antwort.find = true;
            }
        }

        response.setContentType("application/json");
        PrintWriter toBrowser = response.getWriter();
        gson.toJson(antwort, toBrowser);
        toBrowser.flush();
    }
}


class jsonLogin{
    public String pw, mail;
}
class jsonLogin_ant{
    public long kunr;
    public String name, vorname;
    public Boolean find;
}