package kr.co.shop.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "TB_ORDER")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @Column(name = "ID_ORDER", length = 30)
    private String idOrder;

    @Column(name = "ID_USER", length = 100, nullable = false)
    private String idUser;

    @Column(name = "QT_ORDER_AMOUNT")
    private Integer qtOrderAmount;

    @Column(name = "QT_DELI_MONEY")
    private Integer qtDeliMoney;

    @Column(name = "QT_DELI_PERIOD")
    private Integer qtDeliPeriod;

    @Column(name = "NM_ORDER_PERSON", length = 100)
    private String nmOrderPerson;

    @Column(name = "NM_RECEIVER", length = 100)
    private String nmReceiver;

    @Column(name = "NO_DELIVERY_ZIPNO", length = 20)
    private String noDeliveryZipno;

    @Column(name = "NM_DELIVERY_ADDRESS", length = 200)
    private String nmDeliveryAddress;

    @Column(name = "NM_RECEIVER_TELNO", length = 20)
    private String nmReceiverTelno;

    @Column(name = "NM_DELIVERY_SPACE", length = 100)
    private String nmDeliverySpace;

    @Column(name = "CD_ORDER_TYPE", length = 4)
    private String cdOrderType;     // 10: 일반주문

    @Column(name = "DA_ORDER")
    private LocalDateTime daOrder;

    @Column(name = "ST_ORDER", length = 4)
    private String stOrder;         // 10: 주문완료

    @Column(name = "ST_PAYMENT", length = 4)
    private String stPayment;       // 20: 결제완료

    @Column(name = "NO_REGISTER", length = 30)
    private String noRegister;

    @Column(name = "DA_FIRST_DATE")
    private LocalDateTime daFirstDate;

    public void updateStatus(String stOrder) {
        this.stOrder = stOrder;
    }
}