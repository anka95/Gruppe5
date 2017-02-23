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
            name = "CheckEmail", 
            urlPatterns = "/CheckEmail"
)

public class CheckEmail extends HttpServlet{
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
        
        jsonEmail anfrage = gson.fromJson(fromBrowser, jsonEmail.class);
        jsonEmailAntwort antwort = new jsonEmailAntwort();
        
        antwort.vorhanden = false;
        
        for(int i = 0; i < database.findAllCustomers().size(); i++ ){
            if(database.findAllCustomers().get(i).getEmail().equals(anfrage.mail)){
                antwort.vorhanden = true;
            }
        }
        
        response.setContentType("application/json");
        PrintWriter toBrowser = response.getWriter();
        gson.toJson(antwort, toBrowser);
        toBrowser.flush();
    }
}
    
class jsonEmail{
    public String mail;
}

class jsonEmailAntwort{
    public Boolean vorhanden;
}
