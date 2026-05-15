package kr.co.shop.dto;

import kr.co.shop.domain.Product;
import lombok.Getter;

@Getter
public class ProductListResponse {

    private final String noProduct;
    private final String nmProduct;
    private final int qtSalePrice;
    private final Integer qtCustomer;
    private final Long nbThumbnail;
    private final Integer qtStock;

    public ProductListResponse(Product product) {
        this.noProduct   = product.getNoProduct();
        this.nmProduct   = product.getNmProduct();
        this.qtSalePrice = product.getQtSalePrice();
        this.qtCustomer  = product.getQtCustomer();
        this.nbThumbnail = product.getNbThumbnail();
        this.qtStock = product.getQtStock();
    }
}