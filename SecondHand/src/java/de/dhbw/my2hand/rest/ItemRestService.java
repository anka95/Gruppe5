package de.dhbw.my2hand.rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import de.dhbw.my2hand.database.Item;
import de.dhbw.my2hand.database.PersonType;
import de.dhbw.my2hand.jsonClasses.JsonItem;
import de.dhbw.my2hand.jsonClasses.JsonPersonType;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Stateless
@Path("Artikel")
public class ItemRestService {

    @PersistenceContext(unitName = "default")
    private EntityManager em;
    private Gson gson = new GsonBuilder().create();

    /**
     * GET /RestAPI/Artikel Liefert eine JSON-Liste mit allen Artikeln zurück
     *
     * @return JSON-String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String findAllItems() {
        List<Item> items = this.em.createQuery("SELECT n FROM Item n ORDER BY n.id").getResultList();
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

        return gson.toJson(jsonItems);
    }

    /**
     * GET /RestAPI/Artikel/{id} Liefert die Artikel mit der übergebenen ID als
     * JSON zurück
     *
     * @param id ID der Abteilung
     * @return JSON-String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public String findItemsOfPersonType(@PathParam("id") long id) {
        PersonType personType = em.find(PersonType.class, id);

        JsonPersonType jsonPersonTypes = new JsonPersonType();
        jsonPersonTypes.id = personType.getId();
        jsonPersonTypes.personType = personType.getPersonType();
        jsonPersonTypes.items = new ArrayList<JsonItem>();

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
            jsonPersonTypes.items.add(jsonItem);
        }

        return gson.toJson(jsonPersonTypes);
    }
}
