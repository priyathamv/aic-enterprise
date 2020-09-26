package com.aic.aicenterprise.services.image;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Map;

import static java.util.Objects.isNull;

@Slf4j
@Service
public class ImageServiceImpl implements ImageService {

    private Cloudinary cloudinary;

    @Autowired
    public ImageServiceImpl(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Override
    public String getImageUrl(MultipartFile file) throws IOException {
        Map<String, Object> uploadResult = cloudinary.uploader().upload(convertMultiPartToFile(file), ObjectUtils.emptyMap());
        return uploadResult.get("url").toString();
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        if (isNull(file.getOriginalFilename()))
            return null;

        File convFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }
}
