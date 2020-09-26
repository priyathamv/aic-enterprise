package com.aic.aicenterprise.services.image;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryService {

    @Value("${cloudinary.apiKey}")
    private String apiKey;

    @Value("${cloudinary.apiSecret}")
    private String apiSecret;

    @Bean
    public Cloudinary getCloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "aicgroup");
        config.put("api_key", apiKey);
        config.put("api_secret", apiSecret);
        return new Cloudinary(config);
    }

}
