package kr.co.shop.service;

import kr.co.shop.common.exception.BusinessException;
import kr.co.shop.common.util.UserConstants;
import kr.co.shop.domain.Order;
import kr.co.shop.domain.OrderItem;
import kr.co.shop.domain.Product;
import kr.co.shop.domain.User;
import kr.co.shop.dto.AdminOrderResponse;
import kr.co.shop.dto.AdminUserResponse;
import kr.co.shop.dto.OrderItemResponse;
import kr.co.shop.repository.OrderItemRepository;
import kr.co.shop.repository.OrderRepository;
import kr.co.shop.repository.ProductRepository;
import kr.co.shop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;

    // 사용자 전체 목록
    @Transactional(readOnly = true)
    public List<AdminUserResponse> getUsers() {
        return userRepository.findAll()
                .stream()
                .map(AdminUserResponse::new)
                .toList();
    }

    // 사용자 상태 변경
    @Transactional
    public void updateUserStatus(String idUser, String stStatus) {
        User user = userRepository.findByIdUser(idUser)
                .orElseThrow(() ->
                        new BusinessException("사용자를 찾을 수 없습니다.", HttpStatus.NOT_FOUND));
        user.updateStatus(stStatus);
    }

    // 사용자 삭제
    @Transactional
    public void deleteUser(String idUser) {
        User user = userRepository.findByIdUser(idUser)
                .orElseThrow(() ->
                        new BusinessException("사용자를 찾을 수 없습니다.", HttpStatus.NOT_FOUND));

        // 관리자는 삭제 불가
        if (UserConstants.TYPE_ADMIN.equals(user.getCdUserType())) {
            throw new BusinessException("관리자 계정은 삭제할 수 없습니다.", HttpStatus.BAD_REQUEST);
        }

        userRepository.delete(user);
    }

    // 주문 전체 목록
    @Transactional(readOnly = true)
    public List<AdminOrderResponse> getOrders() {
        return orderRepository.findAll()
                .stream()
                .map(order -> new AdminOrderResponse(order, getOrderItems(order)))
                .toList();
    }

    // 주문 상태 변경
    @Transactional
    public void updateOrderStatus(String idOrder, String stOrder) {
        Order order = orderRepository.findById(idOrder)
                .orElseThrow(() ->
                        new BusinessException("주문을 찾을 수 없습니다.", HttpStatus.NOT_FOUND));
        order.updateStatus(stOrder);
    }

    private List<OrderItemResponse> getOrderItems(Order order) {
        return orderItemRepository.findByIdOrder(order.getIdOrder())
                .stream()
                .map(item -> {
                    String nmProduct = productRepository.findById(item.getNoProduct())
                            .map(Product::getNmProduct)
                            .orElse("(삭제된 상품)");
                    return new OrderItemResponse(item, nmProduct);
                })
                .toList();
    }
}