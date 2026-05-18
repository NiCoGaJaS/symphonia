package de.nicogajas.backend.cart;

import de.nicogajas.backend.product.Product;
import de.nicogajas.backend.product.Products;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cart/validate")
public class CartValidationController {
    
    private final Products products;
    
    
    @Autowired
    public CartValidationController(Products products) {
        this.products = products;
    }
    
    
    @PostMapping
    public Set<UUID> invalidIds(@RequestBody Set<UUID> requestedProductIds) {
        Set<UUID> existingIds = products.findAll().stream()
                .map(Product::id)
                .collect(Collectors.toSet());
        
        return requestedProductIds.stream()
                .filter(id -> !existingIds.contains(id))
                .collect(Collectors.toSet());
    }
    
}
