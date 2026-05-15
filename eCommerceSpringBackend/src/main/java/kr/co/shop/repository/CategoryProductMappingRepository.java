package kr.co.shop.repository;

import kr.co.shop.domain.CategoryProductMapping;
import kr.co.shop.domain.CategoryProductMappingId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryProductMappingRepository
        extends JpaRepository<CategoryProductMapping, CategoryProductMappingId> {

    // 상품 코드로 매핑된 카테고리 목록 조회
    List<CategoryProductMapping> findByNoProduct(String noProduct);

    // 상품의 기존 매핑 전체 삭제
    void deleteByNoProduct(String noProduct);
}