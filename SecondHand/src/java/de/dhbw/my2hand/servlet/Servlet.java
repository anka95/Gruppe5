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
    private String customerId, firstName, lastName, address, telephone, email,
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
                firstName = request.getParameter("firstname");
                lastName = request.getParameter("lastname");
                address = request.getParameter("address");
                telephone = request.getParameter("telephone");
                email = request.getParameter("email");
                
                customer = database.createNewCustomer(firstName, lastName,
                                                address, telephone, email);
                    
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
                database.createNewItem(customer, category, brand, new Short(dressSize), new Double(price));
                Customer customerOfItem = database.findCustomer(new Long(customerId));
                JsonCustomer jsonCustomer = new JsonCustomer();
                jsonCustomer.customerId = customerOfItem.getId();
                jsonCustomer.firstName = customerOfItem.getFirstName();
                jsonCustomer.lastName = customerOfItem.getLastName();
                jsonCustomer.address = customerOfItem.getAddress();
                jsonCustomer.telephone = customerOfItem.getTelephone();
                jsonCustomer.email = customerOfItem.getEmail();
                jsonCustomer.countItems = customerOfItem.getItems().size();
                jsonCustomer.items = new ArrayList<JsonItem>();
                
                for (Item item : customerOfItem.getItems()) {
                    JsonItem jsonItem = new JsonItem();
                    jsonItem.id = item.getId();
                    jsonItem.customerId = item.getCustomer().getId();
                    jsonItem.category = item.getCategory();
                    jsonItem.brand = item.getBrand();
                    jsonItem.dressSize = item.getDressSize();
                    jsonItem.price = item.getPrice();
                    jsonCustomer.items.add(jsonItem);
                }
                
                gson.toJson(jsonCustomer, toBrowser);
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
            case "deletecustomer":                           // index.js: deleteCustomer(id)
                // Kunden löschen
                customerId = request.getParameter("customerid");
                
                customer = database.findCustomer(new Long(customerId));
                database.delete(customer);    
                
                break;

            case "deleteitem":                              // content.js: deleteItem(customerId)
                 // Kleidungsstück löschen
                itemId = request.getParameter("itemid");

                item = database.findItem(new Long(itemId));
                database.delete(item);
                
                break;

            case "findallcustomers":                     // index.js: findAllCustomers()
                // Alle Kunden anzeigen
                List<Customer> customers = database.findAllCustomers();
                List<JsonCustomer> jsonCustomers = new ArrayList<JsonCustomer>();
                
                for (Customer customer : customers) {
                    JsonCustomer jsonCustomer = new JsonCustomer();
                    jsonCustomer.customerId = customer.getId();
                    jsonCustomer.firstName = customer.getFirstName();
                    jsonCustomer.lastName = customer.getLastName();
                    jsonCustomer.address = customer.getAddress();
                    jsonCustomer.telephone = customer.getTelephone();
                    jsonCustomer.email = customer.getEmail();
                    jsonCustomer.countItems = customer.getItems().size();
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
                    
                    jsonCustomers.add(jsonCustomer);
                }
                
                gson.toJson(jsonCustomers, toBrowser);
                toBrowser.flush();    
                
                break;

            case "showallitems":                        // content.js: showAllItems(customerId)
                // Alle Kleidungstücke anzeigen
                customerId = request.getParameter("customerid");
                customer = database.findCustomer(new Long(customerId));
                JsonCustomer jsonCustomer = new JsonCustomer();
                jsonCustomer.customerId = customer.getId();
                jsonCustomer.firstName = customer.getFirstName();
                jsonCustomer.lastName = customer.getLastName();
                jsonCustomer.address = customer.getAddress();
                jsonCustomer.telephone = customer.getTelephone();
                jsonCustomer.email = customer.getEmail();
                jsonCustomer.countItems = customer.getItems().size();
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
                
                gson.toJson(jsonCustomer, toBrowser);
                toBrowser.flush();
                
                break;
        }
    }
}

class JsonCustomer {
    public Long customerId;
    public String firstName;
    public String lastName;
    public String address;
    public String telephone;
    public String email;
    public int countItems;
    public List<JsonItem> items;
}

class JsonItem {
    public Long id;
    public Long customerId;
    public String category;
    public String brand;
    public Short dressSize;
    public Double price;
}