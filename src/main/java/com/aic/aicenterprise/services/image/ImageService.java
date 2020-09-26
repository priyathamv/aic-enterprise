package com.aic.aicenterprise.services.image;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {
    String getImageUrl(MultipartFile file) throws IOException;
}
