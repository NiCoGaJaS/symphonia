package de.nicogajas.backend.product.admin;

import de.nicogajas.backend.product.Category;
import de.nicogajas.backend.product.Product;
import de.nicogajas.backend.product.ProductImage;
import de.nicogajas.backend.product.Products;

import java.math.BigDecimal;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/products")
public class ProductAdminController {
    
    private final Products products;
    
    
    @Autowired
    public ProductAdminController(Products products) {
        this.products = products;
    }
    
    
    public record GetProductAdminResponse(
            UUID id,
            String name,
            Category category,
            BigDecimal price,
            ProductImageResponse image
    ) {
        
        public static GetProductAdminResponse fromProduct(Product product) {
            return new GetProductAdminResponse(
                    product.id(),
                    product.name(),
                    product.category(),
                    product.price(),
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
    public Page<GetProductAdminResponse> get(
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return products.findAll(pageable).map(GetProductAdminResponse::fromProduct);
    }
    
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        products.deleteById(id);
    }
    
}
