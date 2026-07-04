package com.cognizant.springlearn;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringLearnApplication {

	// Logger instance tied to this class - standard SLF4J pattern used across Spring Boot apps
	private static final Logger logger = LoggerFactory.getLogger(SpringLearnApplication.class);

	public static void main(String[] args) {
		logger.info(">>> Entered main() method of SpringLearnApplication");

		SpringApplication.run(SpringLearnApplication.class, args);

		logger.info(">>> Spring Boot application has started successfully. main() execution complete.");
	}

}
