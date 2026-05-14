package de.nicogajas.backend.media;

import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MediaStorageConfiguration {

    private final MediaStorageProperties properties;

    @Autowired
    public MediaStorageConfiguration(MediaStorageProperties properties) {
        this.properties = properties;
    }

    @Bean
    public MinioClient minio() {
        return MinioClient.builder()
                .endpoint(properties.endpoint())
                .credentials(properties.user(), properties.password())
                .build();
    }

}
