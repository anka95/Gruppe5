package de.dhbw.my2hand.servlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import de.dhbw.my2hand.database.DatabaseFacade;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CheckLogin {
    @WebServlet(name = "CheckLogin", urlPatterns = {"/CheckLogin"})
    public class Servlet extends HttpServlet {
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
        
            String pw = anfrage.pw;
            String mail = anfrage.mail;
            
            response.setContentType("application/json");
            pw = request.getParameter("pw");
            mail = request.getParameter("mail");
        }
    }
}

class jsonLogin{
    public String pw, mail;
}
class jsonLogin_ant{
    public int KuNr;
    public Boolean loginCorrect;
}