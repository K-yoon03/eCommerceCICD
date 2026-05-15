package kr.co.shop.dto;

import kr.co.shop.domain.BasketItem;
import lombok.Getter;

@Getter
public class BasketItemResponse {

    private final Long nbBasketItem;
    private final String noProduct;
    private final String nmProduct;
    private final Integer qtBasketItemPrice;
    private final Integer qtBasketItem;
    private final Integer qtBasketItemAmount;
    private final Long nbThumbnail;

    public BasketItemResponse(BasketItem item, String nmProduct, Long nbThumbnail) {
        this.nbBasketItem       = item.getNbBasketItem();
        this.noProduct          = item.getNoProduct();
        this.nmProduct          = nmProduct;
        this.qtBasketItemPrice  = item.getQtBasketItemPrice();
        this.qtBasketItem       = item.getQtBasketItem();
        this.qtBasketItemAmount = item.getQtBasketItemAmount();
        this.nbThumbnail        = nbThumbnail;
    }
}