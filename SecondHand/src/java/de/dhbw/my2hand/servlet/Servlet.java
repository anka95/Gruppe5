package de.dhbw.my2hand.servlet;

import de.dhbw.my2hand.database.Category;
import de.dhbw.my2hand.database.Customer;
import de.dhbw.my2hand.database.DatabaseFacade;
import de.dhbw.my2hand.database.DressSize;
import de.dhbw.my2hand.database.Item;
import de.dhbw.my2hand.database.Location;
import de.dhbw.my2hand.database.PersonType;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

import javax.ejb.EJB;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FilenameUtils;

@WebServlet(name = "servlet", urlPatterns = {"/servlet"})
public class Servlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    private static final String UPLOAD_DIRECTORY = "images";
    private static final int THRESHOLD_SIZE = 1024 * 1024 * 3;  // 3MB
    private static final int MAX_FILE_SIZE = 1024 * 1024 * 1024; // 1024MB
    private static final int MAX_REQUEST_SIZE = 1024 * 1024 * 1044; // 1044MB

    @EJB
    private DatabaseFacade database;
    private Customer customer;
    private Location location;
    private Item item;
    private Category category;
    private DressSize dressSize;
    private PersonType personType;
    private String customerId, locationId, title, categoryId, dressSizeId, price, personTypeId;
    private Gson gson = new GsonBuilder().create();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Sonderzeichen richtig erkennen!
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");

        response.setContentType("application/json");        // SONST ERKENNT DER BROWSER NICHT
        PrintWriter toBrowser = response.getWriter();       // DASS WIR IHM JSON SCHICKEN!  

        // Angeforderte Datenbankaktion ausführen
        String action = request.getParameter("action");
        if (action == null) {
            action = "";
        }

        switch (action) {
            case "createnewitem":
                // Neues Kleidungsstück anlegen
                customerId = request.getParameter("customerid");
                locationId = request.getParameter("locationid");
                categoryId = request.getParameter("categoryid");
                dressSizeId = request.getParameter("dresssizeid");
                personTypeId = request.getParameter("persontypeid");

                customer = database.findCustomer(new Long(customerId));
                location = database.findLocation(new Long(locationId));
                category = database.findCategory(new Long(categoryId));
                dressSize = database.findDressSize(new Long(dressSizeId));
                personType = database.findPersonType(new Long(personTypeId));
                title = request.getParameter("title");
                price = request.getParameter("price");
                database.createNewItem(customer, location, title, category, dressSize,
                        new Double(price), personType, "");

                // checks if the request actually contains upload file
                if (!ServletFileUpload.isMultipartContent(request)) {
                    PrintWriter writer = response.getWriter();
                    writer.println("Request does not contain upload data");
                    writer.flush();
                    return;
                }

                // configures upload settings
                DiskFileItemFactory factory = new DiskFileItemFactory();
                factory.setSizeThreshold(THRESHOLD_SIZE);
                factory.setRepository(new File(System.getProperty("java.io.tmpdir")));

                ServletFileUpload upload = new ServletFileUpload(factory);
                upload.setFileSizeMax(MAX_FILE_SIZE);
                upload.setSizeMax(MAX_REQUEST_SIZE);

                // constructs the directory path to store upload file
                String uploadPath = getServletContext().getRealPath("")
                        + File.separator + UPLOAD_DIRECTORY;

                // creates the directory if it does not exist
                File uploadDir = new File(uploadPath);
                if (!uploadDir.exists()) {
                    uploadDir.mkdir();
                }

                try {
                    // parses the request's content to extract file data
                    List formItems = upload.parseRequest(request);
                    Iterator iter = formItems.iterator();

                    // iterates over form's fields
                    while (iter.hasNext()) {
                        FileItem fileItem = (FileItem) iter.next();
                        // processes only fields that are not form fields
                        if (!fileItem.isFormField()) {
                            String fileExtension = FilenameUtils.getExtension(fileItem.getName());
                            List<Item> items = database.findAllItems();
                            Long itemId = items.get(items.size() - 1).getId();

                            String filePath = uploadPath + File.separator + itemId + "." + fileExtension;
                            File storeFile = new File(filePath);

                            item = database.findItem(itemId);
                            item.setImagePath(UPLOAD_DIRECTORY + File.separator + itemId + "." + fileExtension);
                            database.save(item);

                            // saves the file on disk
                            fileItem.write(storeFile);
                        }
                    }
                    request.setAttribute("message", "Upload has been done successfully!");
                } catch (Exception ex) {
                    request.setAttribute("message", "There was an error: " + ex.getMessage());
                }
                response.sendRedirect("http://localhost:8080/Gruppe5/SecondHand/");

                break;

            case "updateitem":
                // Artikel aktualisieren
                item = database.findItem(new Long(request.getParameter("id")));
                item.setTitle(request.getParameter("title"));
                item.setPrice(new Double(request.getParameter("price")));
                database.save(item);

                break;
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Sonderzeichen richtig erkennen!
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");

        response.setContentType("application/json");        // SONST ERKENNT DER BROWSER NICHT
        PrintWriter toBrowser = response.getWriter();       // DASS WIR IHM JSON SCHICKEN!  

        // Angeforderte Datenbankaktion ausführen
        String action = request.getParameter("action");
        if (action == null) {
            action = "";
        }

        switch (action) {
            case "deletecustomer":
                // Kunden löschen
                customer = database.findCustomer(new Long(request.getParameter("customerid")));
                database.delete(customer);

                break;

            case "deleteitem":
                // Kleidungsstück und Artikelbild löschen
                item = database.findItem(new Long(request.getParameter("itemid")));
                String imagePath = getServletContext().getRealPath("") + File.separator + item.getImagePath();
                File image = new File(imagePath);
                image.delete();
                database.delete(item);

                break;

            case "findallitems":
                // Alle Kleidungstücke eines Kunden anzeigen
                customer = database.findCustomer(new Long(request.getParameter("customerid")));

                JsonCustomer jsonCustomer = new JsonCustomer();
                jsonCustomer.customerId = customer.getId();
                jsonCustomer.salutation = customer.getSalutation();
                jsonCustomer.firstName = customer.getFirstName();
                jsonCustomer.lastName = customer.getLastName();
                jsonCustomer.street = customer.getStreet();
                jsonCustomer.houseNumber = customer.getHouseNumber();
                jsonCustomer.plz = customer.getPLZ();
                jsonCustomer.place = customer.getPlace();
                jsonCustomer.iban = customer.getIban();
                jsonCustomer.bic = customer.getBic();
                jsonCustomer.bank = customer.getBank();
                jsonCustomer.telephone = customer.getTelephone();
                jsonCustomer.email = customer.getEmail();
                jsonCustomer.password = customer.getPassword();
                jsonCustomer.items = new ArrayList<JsonItem>();

                for (Item item : customer.getItems()) {
                    JsonItem jsonItem = new JsonItem();
                    jsonItem.id = item.getId();
                    jsonItem.locationPlace = item.getLocation().getPlace();
                    jsonItem.title = item.getTitle();
                    jsonItem.categoryName = item.getCategory().getCategory();
                    jsonItem.dressSizeName = item.getDressSize().getDressSize();
                    jsonItem.price = item.getPrice();
                    jsonItem.personTypeName = item.getPersonType().getPersonType();
                    jsonItem.imagePath = item.getImagePath();
                    jsonItem.sold = item.getSold();
                    jsonItem.published = item.getPublished();
                    jsonCustomer.items.add(jsonItem);
                }

                gson.toJson(jsonCustomer, toBrowser);
                toBrowser.flush();

                break;

            case "finditemsofallcustomers":
                // Alle Kleidungstücke aller Kunden anzeigen
                List<Item> items = database.findAllItems();
                List<JsonItem> jsonItems = new ArrayList<JsonItem>();

                for (Item item : items) {
                    JsonItem jsonItem = new JsonItem();
                    jsonItem.id = item.getId();
                    jsonItem.customerId = item.getCustomer().getId();
                    jsonItem.locationPlace = item.getLocation().getPlace();
                    jsonItem.title = item.getTitle();
                    jsonItem.categoryName = item.getCategory().getCategory();
                    jsonItem.dressSizeName = item.getDressSize().getDressSize();
                    jsonItem.price = item.getPrice();
                    jsonItem.personTypeName = item.getPersonType().getPersonType();
                    jsonItem.imagePath = item.getImagePath();
                    jsonItem.sold = item.getSold();
                    jsonItem.published = item.getPublished();
                    jsonItems.add(jsonItem);
                }

                gson.toJson(jsonItems, toBrowser);
                toBrowser.flush();

                break;

            case "finditem":
                // Artikel finden
                item = database.findItem(new Long(request.getParameter("itemid")));
                JsonItem jsonItem = new JsonItem();
                jsonItem.id = item.getId();
                jsonItem.customerId = item.getCustomer().getId();
                jsonItem.locationPlace = item.getLocation().getPlace();
                jsonItem.title = item.getTitle();
                jsonItem.categoryName = item.getCategory().getCategory();
                jsonItem.dressSizeName = item.getDressSize().getDressSize();
                jsonItem.price = item.getPrice();
                jsonItem.personTypeName = item.getPersonType().getPersonType();
                jsonItem.imagePath = item.getImagePath();
                jsonItem.sold = item.getSold();
                jsonItem.published = item.getPublished();
                gson.toJson(jsonItem, toBrowser);
                toBrowser.flush();

                break;
        }
    }
}

class JsonCustomer {

    public Long customerId;
    public String salutation, firstName, lastName, street, houseNumber, plz,
            place, iban, bic, bank, telephone, email, password;
    public List<JsonItem> items;
}

class JsonItem {

    public Long id, customerId;
    public String title, locationPlace, categoryName, dressSizeName, personTypeName, imagePath;
    public Double price;
    public Boolean sold, published;
}
