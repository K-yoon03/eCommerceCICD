package kr.co.shop.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "TB_BASKET_ITEM")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class BasketItem {

    @Id
    @Column(name = "NB_BASKET_ITEM")
    private Long nbBasketItem;

    @Column(name = "NB_BASKET", nullable = false)
    private Long nbBasket;

    @Column(name = "CN_BASKET_ITEM_ORDER", nullable = false)
    private Integer cnBasketItemOrder;

    @Column(name = "NO_PRODUCT", length = 30, nullable = false)
    private String noProduct;

    @Column(name = "NO_USER", length = 30, nullable = false)
    private String noUser;

    @Column(name = "QT_BASKET_ITEM_PRICE")
    private Integer qtBasketItemPrice;

    @Column(name = "QT_BASKET_ITEM")
    private Integer qtBasketItem;

    @Column(name = "QT_BASKET_ITEM_AMOUNT")
    private Integer qtBasketItemAmount;

    @Column(name = "NO_REGISTER", length = 30)
    private String noRegister;

    @Column(name = "DA_FIRST_DATE")
    private LocalDateTime daFirstDate;

    public void updateQuantity(Integer qtBasketItem, Integer qtBasketItemAmount) {
        this.qtBasketItem       = qtBasketItem;
        this.qtBasketItemAmount = qtBasketItemAmount;
    }
}