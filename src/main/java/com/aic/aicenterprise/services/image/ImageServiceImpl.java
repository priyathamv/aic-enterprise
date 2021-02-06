package com.aic.aicenterprise.services.image;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import java.util.HashMap;
import java.util.Random;
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
        String fileName = String.valueOf("/tmp/" +System.currentTimeMillis() + new Random().nextInt(10000));

        Map<String, Object> uploadResult = cloudinary.uploader().upload(convertMultiPartToFile(file, fileName), ObjectUtils.emptyMap());
        String imageUrl = uploadResult.get("url").toString();

        boolean deleteStatus = new File(fileName).delete();
        log.info("Image deleted from /tmp: {}", deleteStatus);

        return imageUrl;
    }

    private File convertMultiPartToFile(MultipartFile file, String fileName) throws IOException {
//        if (isNull(file.getOriginalFilename()))
//            return null;

        File convFile = new File(fileName);
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }
}
