package kr.co.shop.repository;

import kr.co.shop.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, String> {

    List<Order> findByIdUserOrderByDaOrderDesc(String idUser);
}