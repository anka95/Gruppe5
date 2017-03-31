package de.dhbw.my2hand.rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import de.dhbw.my2hand.database.Customer;
import de.dhbw.my2hand.database.Item;
import de.dhbw.my2hand.jsonClasses.JsonCustomer;
import de.dhbw.my2hand.jsonClasses.JsonItem;
import java.util.ArrayList;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Klasse für den Kunden-Rest-Service.
 */
@Stateless
@Path("Kunden")
public class CustomerRestService {

    @PersistenceContext(unitName = "default")
    private EntityManager em;
    private Gson gson = new GsonBuilder().create();

    /**
     * GET /RestAPI/Kunden/{id}/Profil Liefert das Profil des Kunden mit der
     * übergebenen ID als JSON zurück
     *
     * @param id ID der Abteilung
     * @return JSON-String
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{id}/Profil")
    public String showUserProfile(@PathParam("id") long id) {
        Customer customer = this.em.find(Customer.class, id);

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

        return gson.toJson(jsonCustomer);
    }
}
