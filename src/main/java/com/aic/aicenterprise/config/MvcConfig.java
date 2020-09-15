package com.aic.aicenterprise.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig {

    @Bean
    public WebMvcConfigurer forwardToIndex() {
        return new WebMvcConfigurer() {
            @Override
            public void addViewControllers(ViewControllerRegistry registry) {
                registry.addViewController("/product-list").setViewName("forward:/index.html");
                registry.addViewController("/products").setViewName("forward:/index.html");
                registry.addViewController("/contact-us").setViewName("forward:/index.html");
                registry.addViewController("/about-us").setViewName("forward:index.html");
                registry.addViewController("/covid-19").setViewName("forward:/index.html");
            }
        };
    }

}