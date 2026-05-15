package kr.co.shop.controller;

import jakarta.validation.Valid;
import kr.co.shop.dto.CategoryResponse;
import kr.co.shop.dto.CategorySaveRequest;
import kr.co.shop.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/api/categories")
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getCategoryList());
    }

    @PostMapping("/api/admin/categories")
    public ResponseEntity<Map<String, String>> createCategory(
            @Valid @RequestBody CategorySaveRequest categorySaveRequest,
            @AuthenticationPrincipal String idUser) {
        categoryService.createCategory(categorySaveRequest, idUser);
        return ResponseEntity.status(HttpStatus.CREATED).body( Map.of("message", "카테고리가 생성되었습니다."));
    }

    @PutMapping("/api/admin/categories/{nbCategory}")
    public ResponseEntity<Map<String, String>> updateCategory(
            @PathVariable Integer nbCategory,
            @Valid @RequestBody CategorySaveRequest categorySaveRequest){
        categoryService.updateCategory(nbCategory, categorySaveRequest);
        return ResponseEntity.ok(Map.of("message", "카테고리가 수정되었습니다."));
    }

    @DeleteMapping("/api/admin/categories/{nbCategory}")
    public ResponseEntity<Map<String, String>> deleteCategory(
            @PathVariable Integer nbCategory
    ){
        categoryService.deleteCategory(nbCategory);
        return ResponseEntity.ok(Map.of("message", "카테고리가 삭제되었습니다."));
    }
}
