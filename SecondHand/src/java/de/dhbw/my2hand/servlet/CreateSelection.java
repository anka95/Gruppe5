package de.dhbw.my2hand.servlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import de.dhbw.my2hand.database.Category;
import de.dhbw.my2hand.database.DatabaseFacade;
import de.dhbw.my2hand.database.DressSize;
import de.dhbw.my2hand.database.Item;
import de.dhbw.my2hand.database.Location;
import de.dhbw.my2hand.database.PersonType;
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

@WebServlet(
        name = "CreateSelection",
        urlPatterns = "/CreateSelection"
)
public class CreateSelection extends HttpServlet {

    @EJB
    private DatabaseFacade database;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        // Sonderzeichen richtig erkennen!
        req.setCharacterEncoding("utf-8");
        resp.setCharacterEncoding("utf-8");

        Gson gson = new GsonBuilder().create();

        JsonNav_ant antwort = new JsonNav_ant();

        List<Location> locations = database.findAllLocations();
        List<Category> categories = database.findAllCategories();
        List<PersonType> personTypes = database.findAllPersonTypes();
        List<DressSize> dressSizes = database.findAllDressSizes();

        List<JsonLocation> jsonLocations = new ArrayList<JsonLocation>();
        List<JsonCategory> jsonCategories = new ArrayList<JsonCategory>();
        List<JsonPersonType> jsonPersonTypes = new ArrayList<JsonPersonType>();
        List<JsonDressSize> jsonDressSizes = new ArrayList<JsonDressSize>();

        for (Location location : locations) {
            JsonLocation jsonLocation = new JsonLocation();
            jsonLocation.id = location.getId();
            jsonLocation.place = location.getPlace();
            jsonLocation.items = new ArrayList<JsonItem>();

            for (Item item : location.getItems()) {
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
                jsonLocation.items.add(jsonItem);
            }
            jsonLocations.add(jsonLocation);
        }
        antwort.loc = jsonLocations;

        for (Category category : categories) {
            JsonCategory jsonCategory = new JsonCategory();
            jsonCategory.id = category.getId();
            jsonCategory.category = category.getCategory();
            jsonCategory.items = new ArrayList<JsonItem>();

            for (Item item : category.getItems()) {
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
                jsonCategory.items.add(jsonItem);
            }
            jsonCategories.add(jsonCategory);
        }
        antwort.cat = jsonCategories;

        for (PersonType personType : personTypes) {
            JsonPersonType jsonPT = new JsonPersonType();
            jsonPT.id = personType.getId();
            jsonPT.personType = personType.getPersonType();
            jsonPT.items = new ArrayList<JsonItem>();

            for (Item item : personType.getItems()) {
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
                jsonPT.items.add(jsonItem);
            }
            jsonPersonTypes.add(jsonPT);
        }
        antwort.persontype = jsonPersonTypes;

        for (DressSize dressSize : dressSizes) {
            JsonDressSize jsonDressSize = new JsonDressSize();
            jsonDressSize.id = dressSize.getId();
            jsonDressSize.dressSize = dressSize.getDressSize();
            jsonDressSize.items = new ArrayList<JsonItem>();

            for (Item item : dressSize.getItems()) {
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
                jsonDressSize.items.add(jsonItem);
            }
            jsonDressSizes.add(jsonDressSize);
        }
        antwort.size = jsonDressSizes;

        resp.setContentType("application/json");
        PrintWriter toBrowser = resp.getWriter();
        gson.toJson(antwort, toBrowser);
        toBrowser.flush();
    }
}

//class jsonNav{
//    
//}
class JsonLocation {

    public Long id;
    public String place;
    public List<JsonItem> items;
}

class JsonCategory {

    public Long id;
    public String category;
    public List<JsonItem> items;
}

class JsonDressSize {

    public Long id;
    public String dressSize;
    public List<JsonItem> items;
}

class JsonPersonType {

    public Long id;
    public String personType;
    public List<JsonItem> items;
}

class JsonNav_ant {

    public List<JsonLocation> loc;
    public List<JsonCategory> cat;
    public List<JsonPersonType> persontype;
    public List<JsonDressSize> size;
}
