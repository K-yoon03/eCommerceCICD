package kr.co.shop.controller;

import jakarta.validation.Valid;
import kr.co.shop.dto.ProductDetailResponse;
import kr.co.shop.dto.ProductListResponse;
import kr.co.shop.dto.ProductSaveRequest;
import kr.co.shop.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;


    // Controller 카테고리별 분류 서비스 변경에 따른 Request Param을 이용한 분기
    // Claude Code 사용
    @GetMapping("/api/products")
    public ResponseEntity<Page<ProductListResponse>> getProducts(
            @RequestParam(required = false) Integer categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(productService.getProducts(categoryId, pageable));
    }

    @GetMapping("/api/products/{noProduct}")
    public ResponseEntity<ProductDetailResponse> getProduct(
            @PathVariable String noProduct) {
        return ResponseEntity.ok(productService.getProduct(noProduct));
    }

    @PostMapping("/api/admin/products")
    public ResponseEntity<Map<String, String>> createProduct(
            @Valid @RequestBody ProductSaveRequest request,
            @AuthenticationPrincipal String idUser) {
        productService.createProduct(request, idUser);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("message", "상품이 등록되었습니다."));
    }

    @PutMapping("/api/admin/products/{noProduct}")
    public ResponseEntity<Map<String, String>> updateProduct(
            @PathVariable String noProduct,
            @Valid @RequestBody ProductSaveRequest request,
            @AuthenticationPrincipal String idUser) {
        productService.updateProduct(noProduct, request, idUser);
        return ResponseEntity.ok(Map.of("message", "상품이 수정되었습니다."));
    }

    @DeleteMapping("/api/admin/products/{noProduct}")
    public ResponseEntity<Map<String, String>> deleteProduct(
            @PathVariable String noProduct) {
        productService.deleteProduct(noProduct);
        return ResponseEntity.ok(Map.of("message", "상품이 삭제되었습니다."));
    }
}