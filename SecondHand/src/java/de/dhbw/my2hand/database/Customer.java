package de.dhbw.my2hand.database;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * Persistenzklasse für einen Kunden. Ein Kunde hat einen Vornamen, einen Nachnamen,
 * eine Anschrift, eine Telefonnummer, eine E-Mail-Adresse und
 * beliebig viele zum Verkauf angebotene Artikel.
 */
@Entity
@Table(name="KUNDE")
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id = 0L;

    private String firstName = "";
    private String lastName = "";
    private String address = "";
    private String telephone = "";
    private String email = "";

    @OneToMany(mappedBy="customer")
    private List<Item> items = new ArrayList<>();
    
    // <editor-fold defaultstate="collapsed" desc="${Konstruktoren}">
    /**
     * Standard-Konstruktor, der das Objekt mit leeren Werten initialisiert.
     */
    public Customer() {
    }
    
    /**
     * Konstruktor für einen neuen Kunden mit Vorname, Nachname, Anschrift,
     * Telefonnummer und E-Mail-Adresse.
     * @param firstName Vorname des Kunden
     * @param lastName Nachname des Kunden
     * @param address Anschrift des Kunden
     * @param telephone Telefonnummer des Kunden
     * @param email E-Mail-Adresse des Kunden
     */
    public Customer(String firstName, String lastName, String address,
                    String telephone, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.telephone = telephone;
        this.email = email;
    }
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="${Krimskrams von Object geerbt}">
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Customer)) {
            return false;
        }
        Customer other = (Customer) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "de.dhbw.my2hand.database.Customer[id=" + this.id + ", firstName=" +
                this.firstName + ", lastName=" + this.lastName + ", address=" +
                this.address + ", telephone=" + this.telephone + ", email=" + this.email + "]";
    }
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="${Setter und Getter}">
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }
    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
    // </editor-fold>    
}
