/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package de.dhbw.my2hand.servlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import de.dhbw.my2hand.servlet.SendMail;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "MailApp", urlPatterns = {"/MailApp"})
public class MailApp extends HttpServlet {
    private Gson gson = new GsonBuilder().create();
    JsonStatus antwort = new JsonStatus();
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
// Sonderzeichen richtig erkennen!
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
        
        PrintWriter toBrowser = response.getWriter();
        
        String action = request.getParameter("action");
        if (action == null) {
            action = "";
        }

        switch (action) {
            
            case "sendContact":
                String to = "uemran.celen@gmx.de";
                String name = request.getParameter("name");
                String subject = request.getParameter("subject");
                String message =  "Gesendet von: " + name + " \n Nachricht: " + request.getParameter("message");
                String user = "uemran.celen@gmail.com";
                String pass = "mailiese";
                SendMail.send(to,subject, message, user, pass);
                antwort.status = true;
                
                gson.toJson(antwort, toBrowser);
                toBrowser.flush();
                
                break;
        
        }
    }   
}

class JsonStatus {
    public boolean status;
}