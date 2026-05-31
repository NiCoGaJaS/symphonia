package de.nicogajas.backend.product;

import de.nicogajas.backend.media.BucketStorage;

import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductImages extends BucketStorage {
    
    @Autowired
    public ProductImages(MinioClient minio) {
        super(minio);
    }
    
    
    @Override
    public String bucket() {
        return "product-images";
    }
    
}
