package kr.co.shop.repository;

import kr.co.shop.domain.OrderItem;
import kr.co.shop.domain.OrderItemId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, OrderItemId> {

    List<OrderItem> findByIdOrder(String idOrder);
}