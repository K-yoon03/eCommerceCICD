package kr.co.shop.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "TB_PRODUCT")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @Column(name = "NO_PRODUCT", length = 30)
    private String noProduct;

    @Column(name = "NM_PRODUCT", length = 200, nullable = false)
    private String nmProduct;

    @Lob
    @Column(name = "NM_DETAIL_EXPLAIN")
    private String nmDetailExplain;

    @Column(name = "ID_FILE", length = 30)
    private String idFile;

    @Column(name = "DT_START_DATE", length = 8)
    private String dtStartDate;

    @Column(name = "DT_END_DATE", length = 8)
    private String dtEndDate;

    @Column(name = "QT_CUSTOMER")
    private Integer qtCustomer;

    @Column(name = "QT_SALE_PRICE", nullable = false)
    private Integer qtSalePrice;

    @Column(name = "QT_STOCK")
    private Integer qtStock;

    @Column(name = "QT_DELIVERY_FEE")
    private Integer qtDeliveryFee;

    @Column(name = "NB_THUMBNAIL")
    private Long nbThumbnail;

    @Column(name = "NO_REGISTER", length = 30)
    private String noRegister;

    @Column(name = "DA_FIRST_DATE")
    private LocalDateTime daFirstDate;

    public void update(String nmProduct, String nmDetailExplain,
                       String dtStartDate, String dtEndDate,
                       Integer qtCustomer, Integer qtSalePrice,
                       Integer qtStock, Integer qtDeliveryFee,
                       Long nbThumbnail) {
        this.nmProduct       = nmProduct;
        this.nmDetailExplain = nmDetailExplain;
        this.dtStartDate     = dtStartDate;
        this.dtEndDate       = dtEndDate;
        this.qtCustomer      = qtCustomer;
        this.qtSalePrice     = qtSalePrice;
        this.qtStock         = qtStock;
        this.qtDeliveryFee   = qtDeliveryFee;
        this.nbThumbnail     = nbThumbnail;
    }
}