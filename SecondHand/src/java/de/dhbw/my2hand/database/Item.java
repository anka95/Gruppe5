package de.dhbw.my2hand.database;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * Persistenzklasse für ein Kleidungsstück. Ein Kleidungsstück hat eine Verkäufer,
 * einen Titel, einen Standort, eine Kategorie, eine Größe und einen Preis.
 */
@Entity
@Table(name="ARTIKEL")
public class Item implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id = 0L;
    
    private String title = "";
    private Double price = 0.0;
    private String imagePath = "";
    private boolean sold = false;
    private boolean published = false;
    
    @ManyToOne
    private Customer customer;
    
    @ManyToOne
    private Location location;
    
    @OneToMany(mappedBy="category")
    private Category category;
    
    @OneToMany(mappedBy="personType")
    private PersonType personType;
    
    @OneToMany(mappedBy="dressSize")
    private DressSize dressSize;

    // <editor-fold defaultstate="collapsed" desc="${Konstruktoren}">
    /**
     * Standard-Konstruktor, der das Objekt mit leeren Werten initialisiert.
     */
    public Item() {
    }
    
    /**
     * Konstruktor für ein neues Kleidungsstück mit Titel, Standort, Kategorie,
     * Größe, Preis, Personentyp, verkauft und veröffentlicht.
     * @param customer Kunden zu dem die Artikel gehören
     * @param title Titel des Kleidungsstücks
     * @param location Standort des Kleidungsstücks
     * @param category Kategorie des Kleidungsstücks z.B. Hose
     * @param dressSize Größe des Kleidungsstücks
     * @param price Verkaufspreis des Kleidungsstücks
     * @param personType Personentyp des Kleidungstücks
     * @param imagePath Pfad zur Bilddatei
     */
    public Item(Customer customer, Location location, String title, Category category, DressSize dressSize,
                Double price, PersonType personType, String imagePath) {
        this.customer = customer;
        this.location = location;
        this.title = title;
        this.category = category;
        this.dressSize = dressSize;
        this.price = price;
        this.personType = personType;
        this.imagePath = imagePath;
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
        if (!(object instanceof Item)) {
            return false;
        }
        Item other = (Item) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "de.dhbw.my2hand.database.Item[ id=" + id + " ]";
    }
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="${Setter und Getter}">
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    
    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public DressSize getDressSize() {
        return dressSize;
    }

    public void setDressSize(DressSize dressSize) {
        this.dressSize = dressSize;
    }
    
    public Double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
    
    public PersonType getPersonType() {
        return personType;
    }

    public void setPersonType(PersonType personType) {
        this.personType = personType;
    }
    
    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
    
    public Boolean getSold() {
        return sold;
    }

    public void setSold(boolean sold) {
        this.sold = sold;
    }
    
    public Boolean getPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }
    
    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
    
    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
    // </editor-fold>
}
