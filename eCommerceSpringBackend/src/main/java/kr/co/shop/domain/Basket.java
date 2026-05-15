package kr.co.shop.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "TB_BASKET")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Basket {

    @Id
    @Column(name = "NB_BASKET")
    private Long nbBasket;

    @Column(name = "ID_USER", length = 100, nullable = false)
    private String idUser;

    @Column(name = "QT_BASKET_AMOUNT")
    private Integer qtBasketAmount;

    @Column(name = "NO_REGISTER", length = 30)
    private String noRegister;

    @Column(name = "DA_FIRST_DATE")
    private LocalDateTime daFirstDate;

    public void updateAmount(Integer qtBasketAmount) {
        this.qtBasketAmount = qtBasketAmount;
    }
}