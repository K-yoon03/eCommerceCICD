package kr.co.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {

    private String accessToken;
    private String idUser;
    private String nmUser;
    private String cdUserType;  // 10:일반, 20:관리자
}