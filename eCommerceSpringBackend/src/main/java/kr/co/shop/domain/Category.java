package kr.co.shop.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="TB_CATEGORY")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Category {
    @Id
    @Column(name="nb_category", length = 8)
    private Integer nbCategory;

    @Column(name="nb_parent_category", length = 8)
    private Integer nbParentCategory;

    @Column(name="nm_category", length = 100)
    private String nmCategory;

    @Column(name="nm_full_category", length=500)
    private String nmFullCategory;

    @Column(name="nm_explain", length = 200)
    private String nmExplain;

    @Column(name="cn_level", length = 4)
    private Integer cnLevel;

    @Column(name="cn_order", length = 4)
    private Integer cnOrder;

    @Column(name="yn_use", length = 1)
    private String ynUse;

    @Column(name="yn_delete", length = 1)
    private String ynDelete;

    @Column(name = "no_register", length = 30)
    private String noRegister;

    @Column(name="da_first_date")
    private LocalDateTime daFirstDate;

    public void update(Integer nbParentCategory
                        , String nmCategory, String nmFullCategory, String nmExplain
                        , Integer cnLevel, Integer cnOrder
                        , String ynUse, String ynDelete){
        this.nbParentCategory = nbParentCategory;
        this.nmCategory = nmCategory;
        this.nmFullCategory = nmFullCategory;
        this.nmExplain = nmExplain;
        this.cnLevel = cnLevel;
        this.cnOrder = cnOrder;
        this.ynUse = ynUse;
        this.ynDelete = ynDelete;
    }
}
