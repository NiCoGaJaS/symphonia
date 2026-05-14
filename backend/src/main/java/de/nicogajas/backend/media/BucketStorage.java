package de.nicogajas.backend.media;

import java.io.InputStream;

import io.minio.BucketExistsArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.RemoveObjectArgs;
import io.minio.errors.MinioException;
import jakarta.annotation.PostConstruct;

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
    
    private final MinioClient minio;
    
    
    public BucketStorage(MinioClient minio) {
        this.minio = minio;
        
        createIfNotExists();
    }
    
    
    public abstract String bucket();
    
    
    @PostConstruct
    void init() {
        createIfNotExists();
    }
    
    
    private void createIfNotExists() {
        try {
            boolean exists = minio.bucketExists(BucketExistsArgs.builder().bucket(bucket()).build());
            
            if (!exists) {
                minio.makeBucket(MakeBucketArgs.builder().bucket(bucket()).build());
            }
        } catch (MinioException exception) {
            throw new RuntimeException("Failed to create %s as a bucket.".formatted(bucket()), exception);
        }
    }
    
    
    /**
     * Uploads an object to this bucket.
     * 
     * @param name the object key inside the bucket
     * @param data the content of the object
     * @param size the size of the object in bytes
     * @param type the content type of the object
     */
    public void upload(String name, InputStream data, long size, String type) {
        try {
            minio.putObject(
                    PutObjectArgs.builder()
                            .bucket(bucket())
                            .object(name)
                            .stream(data, size, -1L)
                            .contentType(type)
                            .build());
        } catch (MinioException exception) {
            throw new RuntimeException("Failed to upload %s to %s.".formatted(name, bucket()), exception);
        }
    }
    
    
    /**
     * Deletes an object from this bucket.
     * 
     * @param name the object key inside the bucket
     */
    public void delete(String name) {
        try {
            minio.removeObject(
                    RemoveObjectArgs.builder()
                            .bucket(bucket())
                            .object(name)
                            .build());
        } catch (MinioException exception) {
            throw new RuntimeException("Failed to delete", exception);
        }
    }
    
}
