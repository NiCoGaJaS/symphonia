package de.nicogajas.backend;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.DynamicPropertyRegistrar;
import org.testcontainers.containers.MinIOContainer;
import org.testcontainers.postgresql.PostgreSQLContainer;
import org.testcontainers.utility.DockerImageName;

@TestConfiguration(proxyBeanMethods = false)
class TestcontainersConfiguration {
    
    @Bean
    @ServiceConnection
    PostgreSQLContainer postgres() {
        return new PostgreSQLContainer(DockerImageName.parse("postgres:latest"));
    }
    
    
    @Bean
    MinIOContainer minioContainer() {
        return new MinIOContainer("minio/minio:latest");
    }
    
    
    @Bean
    DynamicPropertyRegistrar minioProperties(MinIOContainer minioContainer) {
        return registry -> {
            registry.add("mediastorage.endpoint", minioContainer::getS3URL);
            registry.add("mediastorage.user", minioContainer::getUserName);
            registry.add("mediastorage.password", minioContainer::getPassword);
        };
    }
    
}
