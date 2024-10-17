package com.epatner.pos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = { "com.epatner.pos", "com.userManagement" })
@EntityScan(basePackages = { "com.epatner.pos", "com.userManagement" })
@EnableJpaRepositories(basePackages = { "com.epatner.pos", "com.userManagement" })
public class EpatnerPosBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(EpatnerPosBackendApplication.class, args);
	}

}
