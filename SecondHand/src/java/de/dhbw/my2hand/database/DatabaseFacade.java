package de.dhbw.my2hand.database;

import java.util.List;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * Enterprise Java Bean
 */
@Stateless
@LocalBean
public class DatabaseFacade {

    @PersistenceContext(unitName="default")
    private EntityManager em;

    /**
     * Anlegen eines neuen Kunden. Das neue Objekt wird automatisch in der
     * Datenbank gespeichert. Nachträgliche Änderungen daran müssen jedoch mit
     * der save()-Methode manuell gespeichert werden.
     * @param salutation Anrede des Kunden
     * @param firstName Vorname des Kunden
     * @param lastName Nachname des Kunden
     * @param street Straße des Kunden
     * @param houseNumber Hausnummer des Kunden
     * @param plz Postleitzahl des Kunden
     * @param place Ort des Kunden
     * @param telephone Telefonnummer des Kunden
     * @param email E-Mail-Adresse des Kunden
     * @param password Passwort des Kunden
     * @return Der neue Kunde
     */
    public Customer createNewCustomer(String salutation, String firstName, String lastName,
                                    String street, String houseNumber, String plz, String place,
                                    String telephone, String email, String password) {
        Customer customer = new Customer(salutation, firstName, lastName, street,
                                    houseNumber, plz, place, telephone, email, password);
        return this.em.merge(customer);
    }
    
    /**
     * Anlegen eines neuen Kleidungsstücks. Das neue Objekt wird automatisch in der
     * Datenbank gespeichert. Nachträgliche Änderungen daran müssen jedoch mit
     * der save()-Methode manuell gespeichert werden.<br/><br/>
     * 
     * <b>Achtung:</b>Das übergebene Customer-Objekt wird hier ebenfalls gespeichert,
     * damit die Fremdschlüsselintegrität gewahrt bleibt!
     * 
     * @param customer Kunden zu dem die Artikel gehören
     * @param category Kategorie des Kleidungsstücks z.B. Hose
     * @param brand Marke des Kleidungsstücks
     * @param dressSize Größe des Kleidungsstücks
     * @param price Verkaufspreis des Kleidungsstücks
     * @return Das neue Kleidungsstück
     */
    public Item createNewItem(Customer customer, String category, String brand,
                              String dressSize, Double price) {
        Item item = new Item(customer, category, brand, dressSize, price);
        customer.getItems().add(item);
        
        item = this.em.merge(item);
        this.em.merge(customer);
        
        return item;
    }

    /** 
     * Gibt eine Liste aller Kunden und ihrer Artikel zurück.
     * @return Eine Liste aller gefundenen Kunden
     */
    public List<Customer> findAllCustomers() {
        return this.em.createQuery("SELECT n FROM Customer n ORDER BY n.id").getResultList();
    }
    
    /**
     * Auslesen eines Kunden mit all seinen Artikeln anhand seiner ID.
     * @param id Die ID des gesuchten Kunden
     * @return Das gesuchte Customer-Objekt oder null, wenn es nicht gefunden wurde
     */
    public Customer findCustomer(long id) {
        return this.em.find(Customer.class, id);
    }
    
    /**
     * Auslesen eines Kleidungsstück anhand seiner ID. Diese Methode wird nicht benötigt,
     * wenn man schon das Kunden-Objekt hat, zu dem das Kleidungsstück gehört.
     * Sie wird nur benötigt, wenn man ein einzelnes Kleidungsstück unabhängig vom
     * übergreifenden Kunden-Objekt auslesen will.
     * @param id Die ID des gesuchten Kleidungsstücks
     * @return Das gesuchte Item-Objekt oder null, wenn es nicht gefunden wurde
     */
    public Item findItem(long id) {
        return this.em.find(Item.class, id);
    }

    /**
     * Speichern eines Kunden. Wenn noch kein Kunde mit der übergebenen
     * ID existiert, wird ein neuer in der Datenbank abgelegt. Andernfalls wird
     * der vorhandene Tabelleneintrag aktualisiert.
     * @param customer Der zu speichernde Kunde
     */
    public void save(Customer customer) {
        this.em.merge(customer);
    }
    
    /**
     * Speichern eines Kleidungsstücks. Wenn noch kein Kleidungsstück mit der übergebenen ID
     * existiert, wird eine neue in der Datenbank abgelegt. Andernfalls wird
     * der vorhandene Tabelleneintrag aktualisiert.
     * @param item Das zu speichernde Kleidungsstück
     */
    public void save(Item item) {
        this.em.merge(item);
    }
    
    /**
     * Löschen eines Kunden und all seiner Artikel.
     * @param customer Der zu löschende Kunde
     */
    public void delete(Customer customer) {
        customer = this.em.merge(customer);
        
        for (Item item : customer.getItems()) {
            this.em.remove(item);
        }
        
        this.em.remove(customer);
    }
    
    /**
     * Löschen eines einzelnen Kleidungsstücks. Dabei wird der übergeordnete Kunde
     * gespeichert, um die Fremdschlüsselintegrität zu wahren!
     * @param item Das zu löschende Kleidungsstück
     */
    public void delete(Item item) {
        item = this.em.merge(item);
        this.em.remove(item);
        
        item.getCustomer().getItems().remove(item);
        this.em.merge(item.getCustomer());
    }
}
