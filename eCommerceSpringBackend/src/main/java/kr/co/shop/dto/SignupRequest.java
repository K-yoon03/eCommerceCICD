package kr.co.shop.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class SignupRequest {

    @NotBlank(message = "아이디를 입력해주세요.")
    @Size(max = 100)
    private String idUser;

    @NotBlank(message = "이름을 입력해주세요.")
    @Size(max = 100)
    private String nmUser;

    @NotBlank(message = "비밀번호를 입력해주세요.")
    @Size(min = 8, message = "비밀번호는 8자 이상이어야 합니다.")
    private String nmPaswd;

    @NotBlank(message = "휴대전화를 입력해주세요.")
    @Size(max = 30)
    private String noMobile;

    @NotBlank(message = "이메일을 입력해주세요.")
    @Email(message = "이메일 형식이 아닙니다.")
    @Size(max = 100)
    private String nmEmail;
}