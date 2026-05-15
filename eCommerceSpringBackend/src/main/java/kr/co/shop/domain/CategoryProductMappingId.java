package kr.co.shop.domain;

import java.io.Serializable;
import java.util.Objects;

public class CategoryProductMappingId implements Serializable {

    private Integer nbCategory;
    private String noProduct;

    public CategoryProductMappingId() {}

    public CategoryProductMappingId(Integer nbCategory, String noProduct) {
        this.nbCategory = nbCategory;
        this.noProduct  = noProduct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CategoryProductMappingId)) return false;
        CategoryProductMappingId that = (CategoryProductMappingId) o;
        return Objects.equals(nbCategory, that.nbCategory) &&
                Objects.equals(noProduct, that.noProduct);
    }

    @Override
    public int hashCode() {
        return Objects.hash(nbCategory, noProduct);
    }
}