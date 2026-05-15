package kr.co.shop.controller;

import jakarta.validation.Valid;
import kr.co.shop.dto.BasketItemAddRequest;
import kr.co.shop.dto.BasketItemUpdateRequest;
import kr.co.shop.dto.BasketResponse;
import kr.co.shop.service.BasketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/basket")
@RequiredArgsConstructor
public class BasketController {

    private final BasketService basketService;

    // 장바구니 조회
    @GetMapping
    public ResponseEntity<BasketResponse> getBasket(
            @AuthenticationPrincipal String idUser) {
        return ResponseEntity.ok(basketService.getBasket(idUser));
    }

    // 상품 담기
    @PostMapping("/items")
    public ResponseEntity<Map<String, String>> addItem(
            @AuthenticationPrincipal String idUser,
            @Valid @RequestBody BasketItemAddRequest request) {
        basketService.addItem(idUser, request);
        return ResponseEntity.ok(Map.of("message", "상품이 담겼습니다."));
    }

    // 수량 변경
    @PutMapping("/items/{nbBasketItem}")
    public ResponseEntity<Map<String, String>> updateItem(
            @AuthenticationPrincipal String idUser,
            @PathVariable Long nbBasketItem,
            @Valid @RequestBody BasketItemUpdateRequest request) {
        basketService.updateItem(idUser, nbBasketItem, request);
        return ResponseEntity.ok(Map.of("message", "수량이 변경되었습니다."));
    }

    // 품목 삭제
    @DeleteMapping("/items/{nbBasketItem}")
    public ResponseEntity<Map<String, String>> deleteItem(
            @AuthenticationPrincipal String idUser,
            @PathVariable Long nbBasketItem) {
        basketService.deleteItem(idUser, nbBasketItem);
        return ResponseEntity.ok(Map.of("message", "품목이 삭제되었습니다."));
    }

    // 전체 비우기
    @DeleteMapping
    public ResponseEntity<Map<String, String>> clearBasket(
            @AuthenticationPrincipal String idUser) {
        basketService.clearBasket(idUser);
        return ResponseEntity.ok(Map.of("message", "장바구니를 비웠습니다."));
    }
}