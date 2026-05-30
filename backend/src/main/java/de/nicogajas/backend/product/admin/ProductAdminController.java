package de.nicogajas.backend.product.admin;

import de.nicogajas.backend.product.Product;
import de.nicogajas.backend.product.ProductImages;
import de.nicogajas.backend.product.Products;

import java.math.BigDecimal;
import java.util.Locale;
import java.util.Objects;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/admin/products")
public class ProductAdminController {
    
    private final Products products;
    private final ProductImages productImages;
    
    
    @Autowired
    public ProductAdminController(Products products, ProductImages productImages) {
        this.products = products;
        this.productImages = productImages;
    }
    
    
    public record GetProductAdminResponse(
            UUID id,
            String name,
            Product.Category category,
            BigDecimal price,
            ProductImageResponse image
    ) {
        
        public static GetProductAdminResponse fromProduct(Product product) {
            return new GetProductAdminResponse(
                    product.id(),
                    product.name(),
                    product.category(),
                    product.price(),
                    ProductImageResponse.fromProductImage(product.image())
            );
        }
        
    }
    
    public record ProductImageResponse(
            UUID id,
            String url,
            String alternativeText
    ) {
        
        public static ProductImageResponse fromProductImage(Product.Image image) {
            return new ProductImageResponse(image.id(), image.url(), image.alternativeText());
        }
        
    }
    
    public record CreateProductRequest(
            String name,
            Product.Category category,
            BigDecimal price,
            String summary,
            String description
    ) {
        
        public Product toProduct(Product.Image image) {
            return new Product(
                    name,
                    price,
                    summary,
                    description,
                    category,
                    image
            );
        }
        
    }
    
    
    @GetMapping
    public Page<GetProductAdminResponse> get(
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return products.findAll(pageable).map(GetProductAdminResponse::fromProduct);
    }
    
    
    @PostMapping(path = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void create(
            @RequestPart("request") CreateProductRequest request,
            @RequestPart("image") MultipartFile image
    ) {
        Product.Image productImage = upload(image);
        
        products.save(request.toProduct(productImage));
    }
    
    
    private Product.Image upload(MultipartFile image) {
        String objectName = "%s%s".formatted(UUID.randomUUID(), extensionOf(image));
        String contentType = Objects.requireNonNullElse(image.getContentType(), "application/octet-stream");
        
        try {
            productImages.upload(objectName, image.getInputStream(), image.getSize(), contentType);
        } catch (Exception exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Failed to store product image.", exception);
        }
        
        return new Product.Image(
                "/public/%s/%s".formatted(ProductImages.BUCKET, objectName),
                objectName
        );
    }
    
    
    private static String extensionOf(MultipartFile image) {
        String filename = image.getOriginalFilename();
        if (filename == null) {
            return "";
        }
        
        int index = filename.lastIndexOf('.');
        if (index < 0 || index == filename.length() - 1) {
            return "";
        }
        
        return filename.substring(index).toLowerCase(Locale.ROOT);
    }
    
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable UUID id) {
        products.deleteById(id);
    }
    
}
