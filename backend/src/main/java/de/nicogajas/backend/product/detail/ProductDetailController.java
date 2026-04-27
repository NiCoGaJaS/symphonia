package de.nicogajas.backend.product.detail;

import de.nicogajas.backend.product.Product;
import de.nicogajas.backend.product.Products;
import de.nicogajas.backend.product.catalog.ProductCatalogController;

import java.math.BigDecimal;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products/{id}")
public class ProductDetailController {
    
    private final Products products;
    
    
    @Autowired
    public ProductDetailController(Products products) {
        this.products = products;
    }
    
    
    public record GetProductDetailResponse(
            UUID id,
            String name,
            BigDecimal price,
            String shortDescription,
            String description,
            ProductCatalogController.ProductImageResponse image
    ) {
        
        public static GetProductDetailResponse fromProduct(Product product) {
            return new GetProductDetailResponse(product.id(), product.name(), product.price(),
                    product.shortDescription(), product.description(),
                    ProductCatalogController.ProductImageResponse.fromProductImage(product.image()));
        }
        
    }
    
    
    @GetMapping
    public GetProductDetailResponse one(@PathVariable UUID id) {
        Product product = products.findById(id).orElseThrow();
        
        return GetProductDetailResponse.fromProduct(product);
    }
    
}
