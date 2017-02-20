package de.dhbw.my2hand.servlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import de.dhbw.my2hand.database.DatabaseFacade;
import de.dhbw.my2hand.database.Item;
import de.dhbw.my2hand.database.Customer;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "servlet", urlPatterns = {"/servlet"})
public class Servlet extends HttpServlet {
    @EJB 
    private DatabaseFacade database;
    private Customer customer;
    private Item item;
    private String customerId, salutation, firstName, lastName, street, houseNumber,
            plz, place, telephone, email, password,
            itemId, category, brand, dressSize, price;
    private Gson gson = new GsonBuilder().create();
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");        // SONST ERKENNT DER BROWSER NICHT
        PrintWriter toBrowser = response.getWriter();       // DASS WIR IHM JSON SCHICKEN!  
        
        // Sonderzeichen richtig erkennen!
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
        
        // Angeforderte Datenbankaktion ausführen
        String action = request.getParameter("action");
        if (action == null) action = "";
        
        switch(action) {
            case "createnewcustomer":                              // index.js: createNewCustomer()
                // Neuer Kunde anlegen
                salutation = request.getParameter("salutation");
                firstName = request.getParameter("firstname");
                lastName = request.getParameter("lastname");
                street = request.getParameter("street");
                houseNumber = request.getParameter("housenumber");
                plz = request.getParameter("plz");
                place = request.getParameter("place");
                telephone = request.getParameter("telephone");
                email = request.getParameter("email");
                password = request.getParameter("password");
                
                customer = database.createNewCustomer(salutation, firstName, lastName, street,
                        houseNumber, plz, place, telephone, email, password);
                    
                gson.toJson(customer, toBrowser);
                toBrowser.flush();
                
                break;
                
            case "createnewitem":                                 // index.js: createNewItem(customerId)
                // Neues Kleidungsstück anlegen
                customerId = request.getParameter("customerid");
                category = request.getParameter("category");
                brand = request.getParameter("brand");
                dressSize = request.getParameter("dresssize");
                price = request.getParameter("price");
               
                customer = database.findCustomer(new Long(customerId));
                database.createNewItem(customer, category, brand, dressSize, new Double(price));

                gson.toJson(convert(database.findCustomer(new Long(customerId))), toBrowser);
                toBrowser.flush();
                
                break;  
        }     
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");        // SONST ERKENNT DER BROWSER NICHT
        PrintWriter toBrowser = response.getWriter();       // DASS WIR IHM JSON SCHICKEN!  
        
        // Sonderzeichen richtig erkennen!
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
        
        // Angeforderte Datenbankaktion ausführen
        String action = request.getParameter("action");
        if (action == null) action = "";
        
        switch(action) {
            case "deletecustomer":       // index.js: deleteCustomer(id)
                // Kunden löschen
                customerId = request.getParameter("customerid");
                
                customer = database.findCustomer(new Long(customerId));
                database.delete(customer);    
                
                break;

            case "deleteitem":          // content.js: deleteItem(customerId)
                 // Kleidungsstück löschen
                itemId = request.getParameter("itemid");

                item = database.findItem(new Long(itemId));
                database.delete(item);
                
                break;

            case "findallcustomers":   // index.js: findAllCustomers()
                // Alle Kunden anzeigen
                List<Customer> customers = database.findAllCustomers();
                List<JsonCustomer> jsonCustomers = new ArrayList<JsonCustomer>();
                
                for (Customer customer : customers) {
                    jsonCustomers.add(convert(customer));
                }
                
                gson.toJson(jsonCustomers, toBrowser);
                toBrowser.flush();    
                
                break;

            case "findallitems":     // content.js: findAllItems(customerId)
                // Alle Kleidungstücke anzeigen
                customer = database.findCustomer(new Long(request.getParameter("customerid")));
                gson.toJson(convert(customer), toBrowser);
                toBrowser.flush();
                
                break;
        }
    }
    
    private JsonCustomer convert(Customer customer) {
        JsonCustomer jsonCustomer = new JsonCustomer();
        jsonCustomer.customerId = customer.getId();
        jsonCustomer.salutation = customer.getSalutation();
        jsonCustomer.firstName = customer.getFirstName();
        jsonCustomer.lastName = customer.getLastName();
        jsonCustomer.street = customer.getStreet();
        jsonCustomer.houseNumber = customer.getHouseNumber();
        jsonCustomer.plz = customer.getPLZ();
        jsonCustomer.place = customer.getPlace();
        jsonCustomer.telephone = customer.getTelephone();
        jsonCustomer.email = customer.getEmail();
        jsonCustomer.password = customer.getPassword();
        jsonCustomer.items = new ArrayList<JsonItem>();
                
        for (Item item : customer.getItems()) {
            JsonItem jsonItem = new JsonItem();
            jsonItem.id = item.getId();
            jsonItem.customerId = item.getCustomer().getId();
            jsonItem.category = item.getCategory();
            jsonItem.brand = item.getBrand();
            jsonItem.dressSize = item.getDressSize();
            jsonItem.price = item.getPrice();
            jsonCustomer.items.add(jsonItem);
        }
        return jsonCustomer;
    }
}

class JsonCustomer {
    public Long customerId;
    public String salutation, firstName, lastName, street, houseNumber, plz,
                  place, telephone, email, password;
    public List<JsonItem> items;
}

class JsonItem {
    public Long id, customerId;
    public String category, brand, dressSize;
    public Double price;
}