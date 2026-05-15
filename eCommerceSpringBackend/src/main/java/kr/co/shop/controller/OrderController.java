package kr.co.shop.controller;

import jakarta.validation.Valid;
import kr.co.shop.dto.OrderCreateRequest;
import kr.co.shop.dto.OrderResponse;
import kr.co.shop.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
// API 엔드포인트 맵핑
// Claude Code로 수정
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getMyOrders(
            @AuthenticationPrincipal String idUser) {
        return ResponseEntity.ok(orderService.getMyOrders(idUser));
    }


    @GetMapping("/{idOrder}")
    public ResponseEntity<OrderResponse> getOrder(
            @PathVariable String idOrder,
            @AuthenticationPrincipal String idUser) {
        return ResponseEntity.ok(orderService.getOrder(idOrder, idUser));
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(
            @AuthenticationPrincipal String idUser,
            @Valid @RequestBody OrderCreateRequest request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(orderService.createOrder(idUser, request));
    }


    @DeleteMapping("/{idOrder}")
    public ResponseEntity<Map<String, String>> cancelOrder(
            @PathVariable String idOrder,
            @AuthenticationPrincipal String idUser) {
        orderService.cancelOrder(idOrder, idUser);
        return ResponseEntity.ok(Map.of("message", "주문이 취소되었습니다."));
    }
}