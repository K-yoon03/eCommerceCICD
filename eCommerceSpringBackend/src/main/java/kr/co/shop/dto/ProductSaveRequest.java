package kr.co.shop.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

import java.util.List;

@Getter
public class ProductSaveRequest {

    @NotBlank(message = "상품 코드를 입력해주세요.")
    @Size(max = 30)
    private String noProduct;

    @NotBlank(message = "상품명을 입력해주세요.")
    @Size(max = 200)
    private String nmProduct;

    private String nmDetailExplain;

    @Size(max = 8, message = "날짜는 YYYYMMDD 형식으로 입력해주세요.")
    private String dtStartDate;

    @Size(max = 8, message = "날짜는 YYYYMMDD 형식으로 입력해주세요.")
    private String dtEndDate;

    private Integer qtCustomer;

    @NotNull(message = "판매 가격을 입력해주세요.")
    private Integer qtSalePrice;

    private Integer qtStock;

    private Integer qtDeliveryFee;

    private Long nbThumbnail;

    // 카테고리 번호 목록 (매핑 테이블용)
    private List<Integer> categoryIds;
}