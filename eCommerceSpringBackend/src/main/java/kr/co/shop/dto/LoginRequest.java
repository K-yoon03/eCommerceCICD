package kr.co.shop.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class LoginRequest {

    @NotBlank(message = "아이디를 입력해주세요.")
    private String idUser;

    @NotBlank(message = "비밀번호를 입력해주세요.")
    private String nmPaswd;
}