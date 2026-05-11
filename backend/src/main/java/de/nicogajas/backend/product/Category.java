package de.nicogajas.backend.product;

public enum Category {
    
    GITARRE,
    KLAVIER,
    SCHLAGZEUG,
    SCHALLPLATTEN,
    ZUBEHOER,
    KEINE;
    
    
    public String label() {
        return switch (this) {
            case GITARRE       -> "Gitarre";
            case KLAVIER       -> "Klavier";
            case SCHLAGZEUG    -> "Schlagzeug";
            case SCHALLPLATTEN -> "Schallplatten";
            case ZUBEHOER      -> "Zubehör";
            case KEINE         -> "Keine";
        };
    }
    
}
