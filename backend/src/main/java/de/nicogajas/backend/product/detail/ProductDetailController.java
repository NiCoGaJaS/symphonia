package de.nicogajas.backend.product.detail;

import de.nicogajas.backend.product.Product;
import de.nicogajas.backend.product.ProductImage;
import de.nicogajas.backend.product.Products;

import java.math.BigDecimal;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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
            String summary,
            String description,
            ProductImageResponse image
    ) {
        
        public static GetProductDetailResponse fromProduct(Product product) {
            return new GetProductDetailResponse(product.id(), product.name(), product.price(),
                    product.summary(), product.description(),
                    ProductImageResponse.fromProductImage(product.image()));
        }
        
    }
    
    public record ProductImageResponse(
            UUID id,
            String url,
            String alternativeText
    ) {
        
        public static ProductImageResponse fromProductImage(ProductImage image) {
            return new ProductImageResponse(image.id(), image.url(), image.alternativeText());
        }
        
    }
    
    
    @GetMapping
    public GetProductDetailResponse detailOf(@PathVariable UUID id) {
        Product product = products.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produkt konnte nicht gefunden geworden."));
        
        return GetProductDetailResponse.fromProduct(product);
    }
    
}
