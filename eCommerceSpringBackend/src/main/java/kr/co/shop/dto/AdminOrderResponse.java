package kr.co.shop.dto;

import kr.co.shop.domain.Order;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class AdminOrderResponse {

    private final String idOrder;
    private final String idUser;
    private final Integer qtOrderAmount;
    private final Integer qtDeliMoney;
    private final String nmOrderPerson;
    private final String nmReceiver;
    private final String nmDeliveryAddress;
    private final String nmReceiverTelno;
    private final String cdOrderType;
    private final LocalDateTime daOrder;
    private final String stOrder;
    private final String stPayment;
    private final List<OrderItemResponse> items;

    public AdminOrderResponse(Order order, List<OrderItemResponse> items) {
        this.idOrder           = order.getIdOrder();
        this.idUser            = order.getIdUser();
        this.qtOrderAmount     = order.getQtOrderAmount();
        this.qtDeliMoney       = order.getQtDeliMoney();
        this.nmOrderPerson     = order.getNmOrderPerson();
        this.nmReceiver        = order.getNmReceiver();
        this.nmDeliveryAddress = order.getNmDeliveryAddress();
        this.nmReceiverTelno   = order.getNmReceiverTelno();
        this.cdOrderType       = order.getCdOrderType();
        this.daOrder           = order.getDaOrder();
        this.stOrder           = order.getStOrder();
        this.stPayment         = order.getStPayment();
        this.items             = items;
    }
}