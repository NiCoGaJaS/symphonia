package de.nicogajas.backend.product.ids;

import de.nicogajas.backend.product.Product;
import de.nicogajas.backend.product.Products;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/productIds")
public class ProductIdsController {
    
    private final Products products;
    
    
    @Autowired
    public ProductIdsController(Products products) {
        this.products = products;
    }
    
    
    @GetMapping
    public List<UUID> allIds() {
        return products.findAll().stream()
                .map(Product::id)
                .toList();
    }
    

}
