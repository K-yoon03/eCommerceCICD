package kr.co.shop.repository;

import kr.co.shop.domain.Basket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface BasketRepository extends JpaRepository<Basket, Long> {

    Optional<Basket> findByIdUser(String idUser);

    // PK 제약사항 문제 Claude 로 해결
    @Query("SELECT COALESCE(MAX(b.nbBasket), 0) FROM Basket b")
    Long findMaxNbBasket();
}