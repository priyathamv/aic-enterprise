package com.aic.aicenterprise.security;

import com.aic.aicenterprise.services.UserServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {
    private UserServiceImpl userDetailsService;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public WebSecurity(UserServiceImpl userDetailsService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userDetailsService = userDetailsService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        String[] allowedPathsGET = {
//                "/auth/**",
//                "/static/**",
//                "/images/**",
//                "/favicon.ico",
//                "/api/cart/**",
//                "/api/orders/**",
//                "/api/products/**",
//                "/api/featured-products/**",
//                "/api/subscribers/**",
//                "/api/users/**",
//                "/api/brands/**",
//                "/",
//                "/login",
//                "/product-list",
//                "/products",
//                "/contact-us",
//                "/about-us",
//                "/covid19",
//                "/reset-password",
//                "/admin/**",
//                "/account/**",
//                "/confirm-email",
//                "/actuator/**"
//        };
//
//        String[] allowedPathsPOST = {
//                "/login",
//                "/api/products/load-products",
//                "/api/products/save", // TODO: remove later
//                "/api/products/delete", // TODO: remove later
//                "/api/featured-products/save", // TODO: remove later
//                "/api/featured-products/delete", // TODO: remove later
//                "/api/featured-products/load-products", // TODO: remove later
//                "/api/featured-products/delete-products", // TODO: remove later
//                "/api/orders/place-order",
//                "/api/orders/update-status", // TODO: remove later
//                "/api/users/sign-up",
//                "/api/users/save",
//                "/api/users/save-google-user",
//                "/api/users/update",
//                "/api/users/forgot-password",
//                "/api/users/reset-password",
//                "/api/users/user-image",
//                "/api/users/confirm-email",
//                "/api/users/send-confirm-email",
//                "/api/users/update-role", // TODO: remove later
//                "/api/subscribers/save",
//                "/api/cart/save",
//                "/api/brands/save", // TODO: remove later
//                "/api/brands/delete" // TODO: remove later
//        };

        http.cors().and().csrf().disable().authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .antMatchers(HttpMethod.GET, "/**").permitAll()
                .antMatchers(HttpMethod.POST, "/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/**").permitAll()
                .antMatchers( "/images/favicon.ico").permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilter(new JWTAuthenticationFilter(authenticationManager()))
                .addFilter(new JWTAuthorizationFilter(authenticationManager()))
                // this disables session creation on Spring Security
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }
}