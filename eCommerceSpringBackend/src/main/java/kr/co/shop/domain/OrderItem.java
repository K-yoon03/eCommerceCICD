package kr.co.shop.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "TB_ORDER_ITEM")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@IdClass(OrderItemId.class)
public class OrderItem {

    @Id
    @Column(name = "ID_ORDER_ITEM", length = 30)
    private String idOrderItem;

    @Id
    @Column(name = "ID_ORDER", length = 30)
    private String idOrder;

    @Column(name = "CN_ORDER_ITEM", nullable = false)
    private Integer cnOrderItem;

    @Column(name = "NO_PRODUCT", length = 30, nullable = false)
    private String noProduct;

    @Column(name = "ID_USER", length = 100, nullable = false)
    private String idUser;

    @Column(name = "QT_UNIT_PRICE", nullable = false)
    private Integer qtUnitPrice;

    @Column(name = "QT_ORDER_ITEM", nullable = false)
    private Integer qtOrderItem;

    @Column(name = "QT_ORDER_ITEM_AMOUNT")
    private Integer qtOrderItemAmount;

    @Column(name = "QT_ORDER_ITEM_DELIVERY_FEE", nullable = false)
    private Integer qtOrderItemDeliveryFee;

    @Column(name = "ST_PAYMENT", length = 4)
    private String stPayment;

    @Column(name = "NO_REGISTER", length = 30)
    private String noRegister;

    @Column(name = "DA_FIRST_DATE")
    private LocalDateTime daFirstDate;
}