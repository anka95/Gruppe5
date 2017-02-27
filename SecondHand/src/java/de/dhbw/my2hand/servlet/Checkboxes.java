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
            name = "Checkboxes", 
            urlPatterns = "/Checkboxes"
)

/**
 *
 * @author Isabell
 */
public class Checkboxes extends HttpServlet{
    
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
        
        jsonCheckbox anfrage = gson.fromJson(fromBrowser, jsonCheckbox.class);
        jsonCheckboxAntwort antwort = new jsonCheckboxAntwort();
        
            
        
        for(int i = 0; i < database.findAllItems().size(); i++){
            if(database.findAllItems().get(i).getLOCATION_ID().equals(antwort.location)){
                if(database.findAllItems().get(i).getCATEGORY().equals(antwort.category)){
                    if(database.findAllItems().get(i).getPERSONTYPE().equals(antwort.persontype)){
                        if(database.findAllItems().get(i).getDRESSSIZE().equals(antwort.dresssize)){
                               //Ausgabe
                        }
                    }
                }
            }
        }
        
        if(antwort.vorhanden == false){
            antwort.c = database.createNewCustomer(anfrage.salutation, anfrage.firstName, anfrage.lastName, 
                anfrage.street, anfrage.houseNumber, anfrage.plz, 
                anfrage.place, anfrage.iban, anfrage.bic, anfrage.bank, 
                anfrage.telephone, anfrage.email, anfrage.password);
        }
        
        response.setContentType("application/json");
        PrintWriter toBrowser = response.getWriter();
        gson.toJson(antwort, toBrowser);
        toBrowser.flush();
    }
}
    
class jsonCheckbox{
    public String standort, kategorie, abteilung, groessen;
}

class jsonCheckboxAntwort{
    public Boolean Karlsruhe, Berlin, Muenchen, Hamburg, Koeln, Hosen, Accessoires, Roecke, Kleider, Oberteile, 
            Bademode, Jacken, Unterwaesche, Schuhe, Sonstiges, Maenner, Frauen, Maedchen, Jungen, Babys, XS, S,
            M, L, XL, GSonstiges;
    public String location, category, persontype, dresssize; 
            
}







