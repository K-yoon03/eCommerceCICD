package kr.co.shop.repository;

import kr.co.shop.domain.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, String> {

    // JPQL 파트 Cluade Code 이용
    @Query(
            "SELECT p FROM Product p " +
                    "JOIN CategoryProductMapping m ON m.noProduct = p.noProduct " +
                    "WHERE m.nbCategory = :nbCategory"
    )
    Page<Product> findByCategoryId(@Param("nbCategory") Integer nbCategory, Pageable pageable);
}