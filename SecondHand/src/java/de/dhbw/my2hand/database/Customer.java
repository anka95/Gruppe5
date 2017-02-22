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
 * eine Anschrift, Kontodaten, eine Telefonnummer, eine E-Mail-Adresse,
 * ein Passwort und beliebig viele zum Verkauf angebotene Artikel.
 */
@Entity
@Table(name="KUNDE")
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id = 0L;

    private String salutation = "";
    private String firstName = "";
    private String lastName = "";
    private String street = "";
    private String houseNumber = "";
    private String plz = "";
    private String place = "";
    private String iban = "";
    private String bic = "";
    private String bank = "";
    private String telephone = "";
    private String email = "";
    private String password = "";

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
     * @param salutation Anrede des Kunden
     * @param firstName Vorname des Kunden
     * @param lastName Nachname des Kunden
     * @param street Straße des Kunden
     * @param houseNumber Hausnummer des Kunden
     * @param plz Postleitzahl des Kunden
     * @param place Ort des Kunden
     * @param iban IBAN des Kunden
     * @param bic BIC des Kunden
     * @param bank Bankname des Kunden
     * @param telephone Telefonnummer des Kunden
     * @param email E-Mail-Adresse des Kunden
     * @param password Passwort des Kunden
     */
    public Customer(String salutation, String firstName, String lastName,
                    String street, String houseNumber, String plz, String place,
                    String iban, String bic, String bank, String telephone,
                    String email, String password) {
        this.salutation = salutation;
        this.firstName = firstName;
        this.lastName = lastName;
        this.street = street;
        this.houseNumber = houseNumber;
        this.plz = plz;
        this.place = place;
        this.iban = iban;
        this.bic = bic;
        this.bank = bank;
        this.telephone = telephone;
        this.email = email;
        this.password = password;
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
        return "de.dhbw.my2hand.database.Customer[id=" + this.id + ", salutation="
                + this.salutation + ", firstName=" + this.firstName + ", lastName="
                + this.lastName + ", street=" + this.street + ", houseNumber="
                + this.houseNumber + ", plz=" + this.plz + ", place="
                + this.place + ", iban=" + this.iban + ", bic=" + this.bic + ", bank="
                + this.bank + ", telephone=" + this.telephone + ", email="
                + this.email + ", password=" + this.password + "]";
    }
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="${Setter und Getter}">
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSalutation() {
        return salutation;
    }

    public void setSalutation(String salutation) {
        this.salutation = salutation;
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
    
    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }
    
    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getPLZ() {
        return plz;
    }

    public void setPLZ(String plz) {
        this.plz = plz;
    }
    
    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }
    
    public String getIban() {
        return iban;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }
    
    public String getBic() {
        return bic;
    }

    public void setBic(String bic) {
        this.bic = bic;
    }
    
    public String getBank() {
        return bank;
    }

    public void setBank(String bank) {
        this.bank = bank;
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
    
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
    // </editor-fold>    
}
