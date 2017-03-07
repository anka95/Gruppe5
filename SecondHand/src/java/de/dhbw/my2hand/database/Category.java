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
@Table(name="KATEGORIE")
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id = 0L;
    
    private String hose = "";
    private String accessoire ="";
    private String rock = "";
    private String kleid ="";
    private String oberteil = "";
    private String bademode = "";
    private String jacke = "";
    private String unterwaesche ="";
    private String schuhe = "";
    private String sonstiges ="";
 
    @ManyToOne
    private Item artikel;

    // <editor-fold defaultstate="collapsed" desc="${Konstruktoren}">
    /**
     * Standard-Konstruktor, der das Objekt mit leeren Werten initialisiert.
     */
    public Category() {
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
        if (!(object instanceof Category)) {
            return false;
        }
        Category other = (Category) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "de.dhbw.my2hand.database.Category[ id=" + id + " ]";
    }
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="${Setter und Getter}">
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHose() {
        return hose;
    }

    public void setHose(String hose) {
        this.hose = hose;
    }

    public String getAccessoire() {
        return accessoire;
    }

    public void setAccessoire(String accessoire) {
        this.accessoire = accessoire;
    }

    public String getRock() {
        return rock;
    }

    public void setRock(String rock) {
        this.rock = rock;
    }

    public String getKleid() {
        return kleid;
    }

    public void setKleid(String kleid) {
        this.kleid = kleid;
    }

    public String getOberteil() {
        return oberteil;
    }

    public void setOberteil(String oberteil) {
        this.oberteil = oberteil;
    }

    public String getBademode() {
        return bademode;
    }

    public void setBademode(String bademode) {
        this.bademode = bademode;
    }

    public String getJacke() {
        return jacke;
    }

    public void setJacke(String jacke) {
        this.jacke = jacke;
    }

    public String getUnterwaesche() {
        return unterwaesche;
    }

    public void setUnterwaesche(String unterwaesche) {
        this.unterwaesche = unterwaesche;
    }

    public String getSchuhe() {
        return schuhe;
    }

    public void setSchuhe(String schuhe) {
        this.schuhe = schuhe;
    }

    public String getSonstiges() {
        return sonstiges;
    }

    public void setSonstiges(String sonstiges) {
        this.sonstiges = sonstiges;
    }

    public Item getArtikel() {
        return artikel;
    }

    public void setArtikel(Item artikel) {
        this.artikel = artikel;
    }
}