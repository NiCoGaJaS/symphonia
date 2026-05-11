package de.nicogajas.backend.product;

public enum Category {
    
    GUITAR,
    PIANO,
    DRUMS,
    VINYL,
    EXTRA,
    OTHER;
    
    
    public String label() {
        return switch (this) {
            case GUITAR -> "Guitar";
            case PIANO  -> "Piano";
            case DRUMS  -> "Drums";
            case VINYL  -> "Vinyl";
            case EXTRA  -> "Extra";
            case OTHER  -> "Other";
        };
    }
    
}
