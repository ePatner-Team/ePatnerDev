package com.epatner.pos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.epatner.pos", "com.userManagement"})
public class EpatnerPosBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(EpatnerPosBackendApplication.class, args);
	}

}
