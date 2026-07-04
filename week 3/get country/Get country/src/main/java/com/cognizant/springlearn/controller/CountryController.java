package com.cognizant.springlearn.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.springlearn.model.Country;

@RestController
public class CountryController {

    private static final Logger logger = LoggerFactory.getLogger(CountryController.class);

    @Autowired
    private ApplicationContext applicationContext;

    @RequestMapping(value = "/country", method = RequestMethod.GET)
    public Country getCountryIndia() {
        logger.debug("Start :: getCountryIndia()");

        // Load the India bean ("in") that was defined in country.xml
        Country india = (Country) applicationContext.getBean("in");

        logger.debug("End :: getCountryIndia()");
        return india;
    }

    @GetMapping("/countries")
    public List<Country> getAllCountries() {
        logger.debug("Start :: getAllCountries()");

        // Load the countryList bean (java.util.ArrayList of Country) defined in country.xml
        @SuppressWarnings("unchecked")
        List<Country> countryList = (List<Country>) applicationContext.getBean("countryList");

        logger.debug("End :: getAllCountries()");
        return countryList;
    }
}
