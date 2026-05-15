package kr.co.shop.dto;

import kr.co.shop.domain.Product;
import lombok.Getter;

import java.util.List;

@Getter
public class ProductDetailResponse {

    private final String noProduct;
    private final String nmProduct;
    private final String nmDetailExplain;
    private final String dtStartDate;
    private final String dtEndDate;
    private final Integer qtCustomer;
    private final int qtSalePrice;
    private final Integer qtStock;
    private final Integer qtDeliveryFee;
    private final Long nbThumbnail;
    private final List<Integer> categoryIds;

    public ProductDetailResponse(Product product, List<Integer> categoryIds) {
        this.noProduct       = product.getNoProduct();
        this.nmProduct       = product.getNmProduct();
        this.nmDetailExplain = product.getNmDetailExplain();
        this.dtStartDate     = product.getDtStartDate();
        this.dtEndDate       = product.getDtEndDate();
        this.qtCustomer      = product.getQtCustomer();
        this.qtSalePrice     = product.getQtSalePrice();
        this.qtStock         = product.getQtStock();
        this.qtDeliveryFee   = product.getQtDeliveryFee();
        this.nbThumbnail     = product.getNbThumbnail();
        this.categoryIds     = categoryIds;
    }
}