package kr.co.shop.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class CategorySaveRequest {

    @NotNull(message = "카테고리 번호를 입력해주세요.")
    private Integer nbCategory;

    private Integer nbParentCategory;

    @NotBlank(message = "카테고리 이름을 입력해주세요.")
    @Size(max = 100)
    private String nmCategory;

    @Size(max = 500)
    private String nmFullCategory;

    @Size(max = 200)
    private String nmExplain;

    private Integer cnLevel;

    @NotNull(message = "순번을 입력해주세요.")
    private Integer cnOrder;

    // Claude 코드를 이용, DB 제약사항 체크방법
    @Pattern(regexp = "^[YN]$", message = "사용 여부는 Y 또는 N 이어야 합니다.")
    private String ynUse;

    @Pattern(regexp = "^[YN]$", message = "삭제 여부는 Y 또는 N 이어야 합니다.")
    private String ynDelete;
}