package de.dhbw.my2hand.servlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import de.dhbw.my2hand.database.Category;
import de.dhbw.my2hand.database.DatabaseFacade;
import de.dhbw.my2hand.database.DressSize;
import de.dhbw.my2hand.database.Location;
import de.dhbw.my2hand.database.PersonType;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet(
        name = "CreateSelection",
        urlPatterns = "/CreateSelection"
)
public class CreateSelection extends HttpServlet{
    @EJB
    private DatabaseFacade database;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        // Sonderzeichen richtig erkennen!
        req.setCharacterEncoding("utf-8");
        resp.setCharacterEncoding("utf-8");
        
        Gson gson = new GsonBuilder().create();
        
        jsonNav_ant antwort = new jsonNav_ant();
        
        antwort.loc = database.findAllLocations();
        antwort.cat = database.findAllCategories();
        antwort.persontype = database.findAllPersonTypes();
        antwort.size = database.findAllDressSizes();
        
        
        resp.setContentType("application/json");
        PrintWriter toBrowser = resp.getWriter();
        gson.toJson(antwort, toBrowser);
        toBrowser.flush();
    }
}

//class jsonNav{
//    
//}

class jsonNav_ant{
    public List<Location> loc;
    public List<Category> cat;
    public List<PersonType> persontype;
    public List<DressSize> size;
}