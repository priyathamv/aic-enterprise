package com.aic.aicenterprise.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
public class ImageUploadRequest {
    private String email;
    private MultipartFile file;
}
