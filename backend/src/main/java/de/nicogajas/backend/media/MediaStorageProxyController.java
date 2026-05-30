package de.nicogajas.backend.media;

import java.io.InputStream;

import io.minio.GetObjectArgs;
import io.minio.MinioClient;
import io.minio.StatObjectArgs;
import io.minio.StatObjectResponse;
import io.minio.errors.MinioException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/**
 * Controller that acts as a proxy in front of the underlying media/object
 * storage (e.g. MinIO, S3). All public media requests are routed through the
 * backend instead of accessing the object storage directly.
 */
@RestController
@RequestMapping("/public")
public class MediaStorageProxyController {
    
    private static final Logger logger = LoggerFactory.getLogger(MediaStorageProxyController.class);
    
    private final MinioClient minio;
    
    
    @Autowired
    public MediaStorageProxyController(MinioClient minio) {
        this.minio = minio;
    }
    
    
    @GetMapping("/{bucket}/{*object}")
    public ResponseEntity<InputStreamResource> get(
            @PathVariable String bucket,
            @PathVariable String object
    ) {
        try {
            logger.debug("Media request for {}/{}.", bucket, object);
            StatObjectResponse metadata = minio
                    .statObject(StatObjectArgs.builder().bucket(bucket).object(object).build());
            String type = metadata.contentType();
            long size = metadata.size();
            
            logger.debug("Media {}/{} as type={} with size={} successfully found.", bucket, object, type, size);
            
            InputStream image = minio.getObject(GetObjectArgs.builder().bucket(bucket).object(object).build());
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(type))
                    .contentLength(metadata.size())
                    .body(new InputStreamResource(image));
        } catch (MinioException exception) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Failed to retrieve object '%s' in bucket '%s'.".formatted(object, bucket),
                    exception
            );
        }
    }
    
}
