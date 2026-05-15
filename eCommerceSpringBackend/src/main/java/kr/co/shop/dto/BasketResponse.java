package kr.co.shop.dto;

import kr.co.shop.domain.Basket;
import lombok.Getter;

import java.util.List;

@Getter
public class BasketResponse {

    private final Long nbBasket;
    private final Integer qtBasketAmount;
    private final List<BasketItemResponse> items;

    public BasketResponse(Basket basket, List<BasketItemResponse> items) {
        this.nbBasket        = basket.getNbBasket();
        this.qtBasketAmount  = basket.getQtBasketAmount();
        this.items           = items;
    }
}