package de.nicogajas.backend.media;

import java.net.URL;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "mediastorage", ignoreUnknownFields = false)
public record MediaStorageProperties(
        URL endpoint,
        String user,
        String password
) {}
