package com.aic.aicenterprise.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig {

    @Bean
    public WebMvcConfigurer forwardToIndex() {
        final String INDEX_HTML = "forward:/index.html";

        return new WebMvcConfigurer() {
            @Override
            public void addViewControllers(ViewControllerRegistry registry) {
                registry.addViewController("/product-list").setViewName(INDEX_HTML);
                registry.addViewController("/products").setViewName(INDEX_HTML);
                registry.addViewController("/contact-us").setViewName(INDEX_HTML);
                registry.addViewController("/about-us").setViewName(INDEX_HTML);
                registry.addViewController("/covid-19").setViewName(INDEX_HTML);
                registry.addViewController("/reset-password").setViewName(INDEX_HTML);
                registry.addViewController("/account").setViewName(INDEX_HTML);
            }
        };
    }

}