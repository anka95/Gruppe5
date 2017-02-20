package de.dhbw.my2hand.database;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Persistenzklasse für ein Kleidungsstück. Ein Kleidungsstück hat eine Kategorie,
 * eine Marke, eine Größe und einen Preis.
 */
@Entity
@Table(name="ARTIKEL")
public class Item implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id = 0L;
    
    private String category = "";
    private String brand = "";
    private String dressSize = "";
    private Double price = 0.0;
    
    @ManyToOne
    private Customer customer;

    // <editor-fold defaultstate="collapsed" desc="${Konstruktoren}">
    /**
     * Standard-Konstruktor, der das Objekt mit leeren Werten initialisiert.
     */
    public Item() {
    }
    
    /**
     * Konstruktor für ein neues Kleidungsstück mit Kategorie, Marke, Größe und Preis.
     * @param customer Kunden zu dem die Artikel gehören
     * @param category Kategorie des Kleidungsstücks z.B. Hose
     * @param brand Marke des Kleidungsstücks
     * @param dressSize Größe des Kleidungsstücks
     * @param price Verkaufspreis des Kleidungsstücks
     */
    public Item(Customer customer, String category, String brand, String dressSize, Double price) {
        this.customer = customer;
        this.category = category;
        this.brand = brand;
        this.dressSize = dressSize;
        this.price = price;
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getDressSize() {
        return dressSize;
    }

    public void setDressSize(String dressSize) {
        this.dressSize = dressSize;
    }
    
    public Double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
    
    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
    // </editor-fold>
}
