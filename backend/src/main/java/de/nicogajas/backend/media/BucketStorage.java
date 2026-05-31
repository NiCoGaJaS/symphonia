package de.nicogajas.backend.media;

import java.io.InputStream;

import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.RemoveObjectArgs;
import io.minio.errors.MinioException;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Abstraction for working with single buckets in the underlying media/object storage (e.g. MinIO, S3).
 * Subclasses define which bucket they operate on via {@link #bucket()}.
 *
 * <p>
 * The idea is similar to creating domain-specific Spring Data repositories like
 * {@code @Repository interface Products extends ListCrudRepository<Product, UUID> {}}.
 * You can create domain-specific {@code BucketStorage} subclasses that is bound to a specific bucket.
 * For example:
 * </p>
 *
 * <pre>{@code
 * @Service
 * public class ProductImageBucket extends BucketStorage {
 *
 *     @Autowired
 *     public ProductImageBucket(MinioClient minio) {
 *         super(minio);
 *     }
 *
 *     @Override
 *     public String bucket() {
 *         return "product-images";
 *     }
 *
 * }
 * }</pre>
 */
public abstract class BucketStorage {
    
    private static final Logger logger = LoggerFactory.getLogger(BucketStorage.class);
    
    private final MinioClient minio;
    
    
    public BucketStorage(MinioClient minio) {
        this.minio = minio;
    }
    
    
    public abstract String bucket();
    
    
    @PostConstruct
    void init() {
        createIfNotExists();
    }
    
    
    private void createIfNotExists() {
        String bucket = bucket();
        
        try {
            logger.debug("Checking if bucket '{}' exists.", bucket);
            boolean exists = minio.bucketExists(BucketExistsArgs.builder().bucket(bucket).build());
            
            if (!exists) {
                logger.debug("Bucket '{}' does not exist. Creating...", bucket);
                minio.makeBucket(MakeBucketArgs.builder().bucket(bucket).build());
                logger.debug("Bucket '{}' created successfully.", bucket);
            } else {
                logger.debug("Bucket '{}' already exists.", bucket);
            }
        } catch (MinioException exception) {
            throw new MediaStorageException("Bucket %s failed to create or verify.".formatted(bucket), exception);
        }
    }
    
    
    /**
     * Uploads an object to this bucket.
     * 
     * @param name the object key inside the bucket
     * @param data the content of the object
     * @param size the size of the object in bytes
     * @param type the content type of the object
     * @throws MediaStorageException if the upload to the underlying storage fails
     */
    public void upload(String name, InputStream data, long size, String type) {
        String bucket = bucket();
        
        try {
            logger.debug(
                    "Uploading object '{}' to bucket '{}' as type={} with size={} bytes.", name, bucket, type,
                    size
            );
            minio.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucket)
                            .object(name)
                            .stream(data, size, -1L)
                            .contentType(type)
                            .build()
            );
            logger.debug("Successfully uploaded object '{}' to bucket '{}'.", name, bucket);
        } catch (MinioException exception) {
            throw new MediaStorageException(
                    "Failed to upload object '%s' to bucket '%s'.".formatted(name, bucket),
                    exception
            );
        }
    }
    
    
    /**
     * Deletes an object from this bucket.
     * 
     * @param name the object key inside the bucket
     * @throws MediaStorageException if the deletion from the underlying storage fails
     */
    public void delete(String name) {
        String bucket = bucket();
        
        try {
            logger.debug("Deleting object '{}' from bucket '{}'.", name, bucket);
            minio.removeObject(
                    RemoveObjectArgs.builder()
                            .bucket(bucket())
                            .object(name)
                            .build()
            );
            logger.debug("Successfully deleted object '{}' from bucket '{}'.", name, bucket);
        } catch (MinioException exception) {
            throw new MediaStorageException(
                    "Failed to delete object '%s' from bucket '%s'.".formatted(name, bucket),
                    exception
            );
        }
    }
    
}
