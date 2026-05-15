package kr.co.shop.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class OrderCreateRequest {

    @NotBlank(message = "주문자명을 입력해주세요.")
    private String nmOrderPerson;

    @NotBlank(message = "수령인을 입력해주세요.")
    private String nmReceiver;

    @NotBlank(message = "우편번호를 입력해주세요.")
    private String noDeliveryZipno;

    @NotBlank(message = "배송 주소를 입력해주세요.")
    private String nmDeliveryAddress;

    @NotBlank(message = "수령인 연락처를 입력해주세요.")
    private String nmReceiverTelno;

    private String nmDeliverySpace;
}