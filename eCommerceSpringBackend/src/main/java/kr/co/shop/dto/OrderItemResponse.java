package kr.co.shop.dto;

import kr.co.shop.domain.OrderItem;
import lombok.Getter;

@Getter
public class OrderItemResponse {

    private final String idOrderItem;
    private final String noProduct;
    private final String nmProduct;
    private final Integer qtUnitPrice;
    private final Integer qtOrderItem;
    private final Integer qtOrderItemAmount;
    private final Integer qtOrderItemDeliveryFee;

    public OrderItemResponse(OrderItem item, String nmProduct) {
        this.idOrderItem            = item.getIdOrderItem();
        this.noProduct              = item.getNoProduct();
        this.nmProduct              = nmProduct;
        this.qtUnitPrice            = item.getQtUnitPrice();
        this.qtOrderItem            = item.getQtOrderItem();
        this.qtOrderItemAmount      = item.getQtOrderItemAmount();
        this.qtOrderItemDeliveryFee = item.getQtOrderItemDeliveryFee();
    }
}