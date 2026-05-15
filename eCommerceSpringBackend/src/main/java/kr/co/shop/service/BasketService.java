package kr.co.shop.service;

import kr.co.shop.common.exception.BusinessException;
import kr.co.shop.domain.Basket;
import kr.co.shop.domain.BasketItem;
import kr.co.shop.domain.Product;
import kr.co.shop.dto.BasketItemAddRequest;
import kr.co.shop.dto.BasketItemResponse;
import kr.co.shop.dto.BasketItemUpdateRequest;
import kr.co.shop.dto.BasketResponse;
import kr.co.shop.repository.BasketItemRepository;
import kr.co.shop.repository.BasketRepository;
import kr.co.shop.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BasketService {

    private final BasketRepository basketRepository;
    private final BasketItemRepository basketItemRepository;
    private final ProductRepository productRepository;

    // 장바구니 조회 (없으면 자동 생성)
    @Transactional
    public BasketResponse getBasket(String idUser) {
        Basket basket = basketRepository.findByIdUser(idUser)
                .orElseGet(() -> createBasket(idUser));

        List<BasketItemResponse> itemResponses = getItemResponses(basket.getNbBasket());
        return new BasketResponse(basket, itemResponses);
    }

    // 상품 담기
    @Transactional
    public void addItem(String idUser, BasketItemAddRequest request) {
        Product product = productRepository.findById(request.getNoProduct())
                .orElseThrow(() ->
                        new BusinessException("상품을 찾을 수 없습니다.", HttpStatus.NOT_FOUND));

        Basket basket = basketRepository.findByIdUser(idUser)
                .orElseGet(() -> createBasket(idUser));

        List<BasketItem> items = basketItemRepository.findByNbBasket(basket.getNbBasket());

        // 이미 담긴 상품이면 수량 추가
        BasketItem existing = items.stream()
                .filter(i -> i.getNoProduct().equals(request.getNoProduct()))
                .findFirst()
                .orElse(null);

        if (existing != null) {
            int newQty    = existing.getQtBasketItem() + request.getQtBasketItem();
            int newAmount = product.getQtSalePrice() * newQty;
            existing.updateQuantity(newQty, newAmount);
        } else {
            long nextId = basketItemRepository.findMaxNbBasketItem() + 1;
            int amount  = product.getQtSalePrice() * request.getQtBasketItem();
            BasketItem newItem = BasketItem.builder()
                    .nbBasketItem(nextId)
                    .nbBasket(basket.getNbBasket())
                    .cnBasketItemOrder(items.size() + 1)
                    .noProduct(request.getNoProduct())
                    .noUser(idUser)
                    .qtBasketItemPrice(product.getQtSalePrice())
                    .qtBasketItem(request.getQtBasketItem())
                    .qtBasketItemAmount(amount)
                    .noRegister(idUser)
                    .daFirstDate(LocalDateTime.now())
                    .build();
            basketItemRepository.save(newItem);
        }

        recalcBasketAmount(basket);
    }

    // 수량 변경
    @Transactional
    public void updateItem(String idUser, Long nbBasketItem, BasketItemUpdateRequest request) {
        BasketItem item = basketItemRepository.findById(nbBasketItem)
                .orElseThrow(() ->
                        new BusinessException("장바구니 품목을 찾을 수 없습니다.", HttpStatus.NOT_FOUND));

        Basket basket = basketRepository.findById(item.getNbBasket())
                .orElseThrow(() ->
                        new BusinessException("장바구니를 찾을 수 없습니다.", HttpStatus.NOT_FOUND));

        if (!basket.getIdUser().equals(idUser)) {
            throw new BusinessException("권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        Product product = productRepository.findById(item.getNoProduct())
                .orElseThrow(() ->
                        new BusinessException("상품을 찾을 수 없습니다.", HttpStatus.NOT_FOUND));

        int newAmount = product.getQtSalePrice() * request.getQtBasketItem();
        item.updateQuantity(request.getQtBasketItem(), newAmount);
        recalcBasketAmount(basket);
    }

    // 품목 삭제
    @Transactional
    public void deleteItem(String idUser, Long nbBasketItem) {
        BasketItem item = basketItemRepository.findById(nbBasketItem)
                .orElseThrow(() ->
                        new BusinessException("장바구니 품목을 찾을 수 없습니다.", HttpStatus.NOT_FOUND));

        Basket basket = basketRepository.findById(item.getNbBasket())
                .orElseThrow(() ->
                        new BusinessException("장바구니를 찾을 수 없습니다.", HttpStatus.NOT_FOUND));

        if (!basket.getIdUser().equals(idUser)) {
            throw new BusinessException("권한이 없습니다.", HttpStatus.FORBIDDEN);
        }

        basketItemRepository.delete(item);
        recalcBasketAmount(basket);
    }

    // 전체 비우기
    @Transactional
    public void clearBasket(String idUser) {
        basketRepository.findByIdUser(idUser).ifPresent(basket -> {
            basketItemRepository.deleteByNbBasket(basket.getNbBasket());
            basket.updateAmount(0);
        });
    }

    // 장바구니 생성
    private Basket createBasket(String idUser) {
        long nextId = basketRepository.findMaxNbBasket() + 1;
        return basketRepository.save(
                Basket.builder()
                        .nbBasket(nextId)
                        .idUser(idUser)
                        .qtBasketAmount(0)
                        .noRegister(idUser)
                        .daFirstDate(LocalDateTime.now())
                        .build()
        );
    }

    // 총 금액 재계산
    private void recalcBasketAmount(Basket basket) {
        List<BasketItem> items = basketItemRepository.findByNbBasket(basket.getNbBasket());
        int total = items.stream()
                .mapToInt(i -> i.getQtBasketItemAmount() != null ? i.getQtBasketItemAmount() : 0)
                .sum();
        basket.updateAmount(total);
    }

    // 품목 응답 변환
    private List<BasketItemResponse> getItemResponses(Long nbBasket) {
        return basketItemRepository.findByNbBasket(nbBasket)
                .stream()
                .map(item -> {
                    Product product = productRepository.findById(item.getNoProduct())
                            .orElseThrow(() ->
                                    new BusinessException("상품을 찾을 수 없습니다.", HttpStatus.NOT_FOUND));
                    return new BasketItemResponse(item, product.getNmProduct(), product.getNbThumbnail());
                })
                .toList();
    }
}