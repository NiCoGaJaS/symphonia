package de.nicogajas.backend.product.catalog;

import de.nicogajas.backend.product.Category;
import de.nicogajas.backend.product.Product;
import de.nicogajas.backend.product.ProductImage;
import de.nicogajas.backend.product.Products;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductCatalogController {
    
    private final Products products;
    
    
    @Autowired
    public ProductCatalogController(Products products) {
        this.products = products;
    }
    
    
    public record GetProductResponse(
            UUID id,
            String name,
            BigDecimal price,
            ProductImageResponse image
    ) {
        
        public static GetProductResponse fromProduct(Product product) {
            return new GetProductResponse(product.id(), product.name(), product.price(),
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
    public List<GetProductResponse> getProducts(
            @RequestParam(required = false) Optional<String> query,
            @RequestParam(required = false) Optional<Category> category,
            @RequestParam(name = "price_min", required = false) Optional<BigDecimal> priceMin,
            @RequestParam(name = "price_max", required = false) Optional<BigDecimal> priceMax
    ) {
        return query.map(this.products::findAllByNameContainsIgnoreCase)
                .orElseGet(this.products::findAll)
                .stream()
                .filter(p -> category.map(c -> p.category() == c).orElse(true))
                .filter(p -> priceMin.map(min -> p.price().compareTo(min) >= 0).orElse(true))
                .filter(p -> priceMax.map(max -> p.price().compareTo(max) <= 0).orElse(true))
                .map(GetProductResponse::fromProduct)
                .toList();
    }
    
}
