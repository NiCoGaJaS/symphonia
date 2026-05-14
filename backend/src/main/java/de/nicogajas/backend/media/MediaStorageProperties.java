package de.nicogajas.backend.media;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.net.URL;

@ConfigurationProperties(prefix = "mediastorage", ignoreUnknownFields = false)
public record MediaStorageProperties(
        URL endpoint,
        String user,
        String password
) {}
