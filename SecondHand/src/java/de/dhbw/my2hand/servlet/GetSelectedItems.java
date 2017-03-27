package de.dhbw.my2hand.servlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import de.dhbw.my2hand.database.DatabaseFacade;
import de.dhbw.my2hand.database.Item;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.List;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "GetSelectedItems", urlPatterns = {"/GetSelectedItems"})

public class GetSelectedItems extends HttpServlet {
    
    @EJB
    private DatabaseFacade database;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
                        throws ServletException, IOException {
        // Sonderzeichen richtig erkennen!
        req.setCharacterEncoding("utf-8");
        resp.setCharacterEncoding("utf-8");
        
        
        BufferedReader fromBrowser = new BufferedReader(new InputStreamReader(req.getInputStream()));
        
        Gson gson = new GsonBuilder().create();
        
        Json_param anfrage = gson.fromJson(fromBrowser, Json_param.class);  
        
        items antwort = new items();
        
        antwort.selectedItems = database.findSelectedItem(anfrage.location, anfrage.category, anfrage.persontyp, anfrage.size);
        
        resp.setContentType("application/json");        // SONST ERKENNT DER BROWSER NICHT
        PrintWriter toBrowser = resp.getWriter();       // DASS WIR IHM JSON SCHICKEN!
        gson.toJson(antwort.selectedItems, toBrowser);
        toBrowser.flush();
    }
    
}

class Json_param{
    public long location, category, persontyp, size;
}

class items{
    public List<Item> selectedItems;
}