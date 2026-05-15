package kr.co.shop.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "TB_CATEGORY_PRODUCT_MAPPING")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@IdClass(CategoryProductMappingId.class)
public class CategoryProductMapping {

    @Id
    @Column(name = "NB_CATEGORY")
    private Integer nbCategory;

    @Id
    @Column(name = "NO_PRODUCT", length = 30)
    private String noProduct;

    @Column(name = "CN_ORDER", nullable = false)
    private Integer cnOrder;

    @Column(name = "NO_REGISTER", length = 30)
    private String noRegister;

    @Column(name = "DA_FIRST_DATE")
    private LocalDateTime daFirstDate;
}