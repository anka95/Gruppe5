package de.dhbw.my2hand.rest;

import java.util.*;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.*;

/**
 * Konfigurationsklasse für den Rest-Service.
 */
@ApplicationPath("RestAPI")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new HashSet<>();
        resources.add(de.dhbw.my2hand.rest.ItemRestService.class);
        resources.add(de.dhbw.my2hand.rest.CustomerRestService.class);
        return resources;
    }
}
