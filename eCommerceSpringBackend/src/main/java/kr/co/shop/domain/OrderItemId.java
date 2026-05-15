package kr.co.shop.domain;

import java.io.Serializable;
import java.util.Objects;

public class OrderItemId implements Serializable {

    private String idOrderItem;
    private String idOrder;

    public OrderItemId() {}

    public OrderItemId(String idOrderItem, String idOrder) {
        this.idOrderItem = idOrderItem;
        this.idOrder     = idOrder;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OrderItemId)) return false;
        OrderItemId that = (OrderItemId) o;
        return Objects.equals(idOrderItem, that.idOrderItem) &&
                Objects.equals(idOrder, that.idOrder);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idOrderItem, idOrder);
    }
}