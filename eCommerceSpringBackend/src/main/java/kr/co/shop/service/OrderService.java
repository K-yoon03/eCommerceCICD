package kr.co.shop.service;

import kr.co.shop.common.exception.BusinessException;
import kr.co.shop.domain.*;
import kr.co.shop.dto.OrderCreateRequest;
import kr.co.shop.dto.OrderItemResponse;
import kr.co.shop.dto.OrderResponse;
import kr.co.shop.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final BasketRepository basketRepository;
    private final BasketItemRepository basketItemRepository;
    private final ProductRepository productRepository;

    // 내 주문 목록
    @Transactional(readOnly = true)
    public List<OrderResponse> getMyOrders(String idUser) {
        return orderRepository.findByIdUserOrderByDaOrderDesc(idUser)
                .stream()
                .map(order -> {
                    List<OrderItemResponse> items = getOrderItems(order.getIdOrder());
                    return new OrderResponse(order, items);
                })
                .toList();
    }

    // 주문 상세
    @Transactional(readOnly = true)
    public OrderResponse getOrder(String idOrder, String idUser) {
        Order order = orderRepository.findById(idOrder)
                .orElseThrow(() ->
                        new BusinessException("주문을 찾을 수 없습니다.", HttpStatus.NOT_FOUND));

        if (!order.getIdUser().equals(idUser)) {
            throw new BusinessException("권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        return new OrderResponse(order, getOrderItems(idOrder));
    }

    // 장바구니 -> 주문 생성
    @Transactional
    public OrderResponse createOrder(String idUser, OrderCreateRequest request) {
        Basket basket = basketRepository.findByIdUser(idUser)
                .orElseThrow(() ->
                        new BusinessException("장바구니가 비어있습니다.", HttpStatus.BAD_REQUEST));

        List<BasketItem> basketItems = basketItemRepository.findByNbBasket(basket.getNbBasket());
        if (basketItems.isEmpty()) {
            throw new BusinessException("장바구니가 비어있습니다.", HttpStatus.BAD_REQUEST);
        }

        // 주문 ID 생성 (날짜 + UUID 앞 8자리)
        String dateStr = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String idOrder = "ORD" + dateStr + UUID.randomUUID().toString().replace("-", "").substring(0, 8).toUpperCase();

        int totalDelivery = 0;
        int totalAmount   = 0;

        Order order = Order.builder()
                .idOrder(idOrder)
                .idUser(idUser)
                .qtOrderAmount(totalAmount)
                .qtDeliMoney(totalDelivery)
                .qtDeliPeriod(3)
                .nmOrderPerson(request.getNmOrderPerson())
                .nmReceiver(request.getNmReceiver())
                .noDeliveryZipno(request.getNoDeliveryZipno())
                .nmDeliveryAddress(request.getNmDeliveryAddress())
                .nmReceiverTelno(request.getNmReceiverTelno())
                .nmDeliverySpace(request.getNmDeliverySpace())
                .cdOrderType("10")
                .daOrder(LocalDateTime.now())
                .stOrder("10")
                .stPayment("20")
                .noRegister(idUser)
                .daFirstDate(LocalDateTime.now())
                .build();

        orderRepository.save(order);

        // 주문 품목 생성
        for (int i = 0; i < basketItems.size(); i++) {
            BasketItem bItem = basketItems.get(i);
            Product product = productRepository.findById(bItem.getNoProduct())
                    .orElseThrow(() ->
                            new BusinessException("상품을 찾을 수 없습니다.", HttpStatus.NOT_FOUND));

            int deliveryFee = product.getQtDeliveryFee() != null ? product.getQtDeliveryFee() : 0;
            int itemAmount  = bItem.getQtBasketItemAmount() != null ? bItem.getQtBasketItemAmount() : 0;

            totalDelivery += deliveryFee;
            totalAmount   += itemAmount;

            String idOrderItem = idOrder + "-" + (i + 1);
            OrderItem orderItem = OrderItem.builder()
                    .idOrderItem(idOrderItem)
                    .idOrder(idOrder)
                    .cnOrderItem(i + 1)
                    .noProduct(bItem.getNoProduct())
                    .idUser(idUser)
                    .qtUnitPrice(bItem.getQtBasketItemPrice())
                    .qtOrderItem(bItem.getQtBasketItem())
                    .qtOrderItemAmount(itemAmount)
                    .qtOrderItemDeliveryFee(deliveryFee)
                    .stPayment("20")
                    .noRegister(idUser)
                    .daFirstDate(LocalDateTime.now())
                    .build();

            orderItemRepository.save(orderItem);
        }



        // 장바구니 비우기
        basketItemRepository.deleteByNbBasket(basket.getNbBasket());
        basket.updateAmount(0);

        return new OrderResponse(order, getOrderItems(idOrder));
    }

    // 주문 취소
    @Transactional
    public void cancelOrder(String idOrder, String idUser) {
        Order order = orderRepository.findById(idOrder)
                .orElseThrow(() ->
                        new BusinessException("주문을 찾을 수 없습니다.", HttpStatus.NOT_FOUND));

        if (!order.getIdUser().equals(idUser)) {
            throw new BusinessException("권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        if (!"10".equals(order.getStOrder())) {
            throw new BusinessException("주문완료 상태에서만 취소할 수 있습니다.", HttpStatus.BAD_REQUEST);
        }

        order.updateStatus("40");
    }

    private List<OrderItemResponse> getOrderItems(String idOrder) {
        return orderItemRepository.findByIdOrder(idOrder)
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