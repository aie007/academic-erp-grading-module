package com.academicerp.backend.config;

import org.springframework.boot.web.server.servlet.CookieSameSiteSupplier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CookieConfig {

    @Bean
    public CookieSameSiteSupplier jsessionIdSupplier() {
        return CookieSameSiteSupplier.ofNone().whenHasName("JSESSIONID");
    }
}

