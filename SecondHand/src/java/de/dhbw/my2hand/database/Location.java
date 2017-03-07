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
 * Persistenzklasse für einen Standort. Ein Standort hat eine Straße, eine Hausnummer,
 * eine Postleitzahl, einen Ort und beliebig viele Artikel, die dort zum Verkauf angeboten werden.
 */
@Entity
@Table(name="STANDORT")
public class Location implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id = 0L;
    
    private String place = "";
    private String street = "";
    private String houseNumber = "";
    private String plz = "";

    @OneToMany(mappedBy="location")
    private List<Item> items = new ArrayList<>();
    
    // <editor-fold defaultstate="collapsed" desc="${Konstruktoren}">
    /**
     * Standard-Konstruktor, der das Objekt mit leeren Werten initialisiert.
     */
    public Location() {
    }
    
    /**
     * Konstruktor für einen neuen Standort mit Straße, Hausnummer, Postleitzahl und Ort.
     * @param street Straße des Standorts
     * @param houseNumber Hausnummer des Standorts
     * @param plz Postleitzahl des Standorts
     * @param place Ort des Standorts
     */
    public Location(String street, String houseNumber, String plz,
                    String place) {
        this.street = street;
        this.houseNumber = houseNumber;
        this.plz = plz;
        this.place = place;
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
        if (!(object instanceof Location)) {
            return false;
        }
        Location other = (Location) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "de.dhbw.my2hand.database.Customer[id=" + this.id + ", street="
                + this.street + ", houseNumber=" + this.houseNumber + ", plz="
                + this.plz + ", place=" + this.place;
    }
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="${Setter und Getter}">
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
    
    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
    // </editor-fold>    
}
