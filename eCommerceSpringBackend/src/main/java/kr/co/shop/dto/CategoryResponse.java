package kr.co.shop.dto;

import kr.co.shop.domain.Category;
import lombok.Getter;

@Getter
public class CategoryResponse {

    private final Integer nbCategory;
    private final Integer nbParentCategory;
    private final String nmCategory;
    private final String nmFullCategory;
    private final String nmExplain;
    private final Integer cnLevel;
    private final Integer cnOrder;
    private final String ynUse;
    private final String ynDelete;

    public CategoryResponse(Category category) {
        this.nbCategory       = category.getNbCategory();
        this.nbParentCategory = category.getNbParentCategory();
        this.nmCategory       = category.getNmCategory();
        this.nmFullCategory   = category.getNmFullCategory();
        this.nmExplain        = category.getNmExplain();
        this.cnLevel          = category.getCnLevel();
        this.cnOrder          = category.getCnOrder();
        this.ynUse            = category.getYnUse();
        this.ynDelete         = category.getYnDelete();
    }
}