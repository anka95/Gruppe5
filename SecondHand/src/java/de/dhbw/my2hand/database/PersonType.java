package de.dhbw.my2hand.database;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Persistenzklasse für ein Kleidungsstück. Ein Kleidungsstück hat eine Verkäufer,
 * einen Titel, einen Standort, eine Kategorie, eine Größe und einen Preis.
 */
@Entity
@Table(name="ABTEILUNG")
public class PersonType implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id = 0L;
    
    private String frau = "";
    private String mann ="";
    private String maedchen = "";
    private String junge ="";
    private String baby = "";
   
    @ManyToOne
    private Item artikel;

    // <editor-fold defaultstate="collapsed" desc="${Konstruktoren}">
    /**
     * Standard-Konstruktor, der das Objekt mit leeren Werten initialisiert.
     */
    public PersonType() {
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
        if (!(object instanceof PersonType)) {
            return false;
        }
        PersonType other = (PersonType) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "de.dhbw.my2hand.database.Section[ id=" + id + " ]";
    }
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="${Setter und Getter}">
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
        
    public String getFrau() {
        return frau;
    }

    public void setFrau(String frau) {
        this.frau = frau;
    }

    public String getMann() {
        return mann;
    }

    public void setMann(String mann) {
        this.mann = mann;
    }

    public String getMaedchen() {
        return maedchen;
    }

    public void setMaedchen(String maedchen) {
        this.maedchen = maedchen;
    }

    public String getJunge() {
        return junge;
    }

    public void setJunge(String junge) {
        this.junge = junge;
    }

    public String getBaby() {
        return baby;
    }

    public void setBaby(String baby) {
        this.baby = baby;
    }

    public Item getArtikel() {
        return artikel;
    }

    public void setArtikel(Item artikel) {
        this.artikel = artikel;
    }

}