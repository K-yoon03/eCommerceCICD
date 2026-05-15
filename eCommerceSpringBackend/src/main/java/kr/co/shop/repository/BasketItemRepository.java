package kr.co.shop.repository;

import kr.co.shop.domain.BasketItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BasketItemRepository extends JpaRepository<BasketItem, Long> {

    List<BasketItem> findByNbBasket(Long nbBasket);

    void deleteByNbBasket(Long nbBasket);

    // PK 제약사항 문제 Claude 로 해결
    @Query("SELECT COALESCE(MAX(b.nbBasketItem), 0) FROM BasketItem b")
    Long findMaxNbBasketItem();
}