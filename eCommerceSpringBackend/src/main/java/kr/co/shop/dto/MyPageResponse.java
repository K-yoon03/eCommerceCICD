package kr.co.shop.dto;

import kr.co.shop.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MyPageResponse {
    private String idUser;
    private String nmUser;
    private String nmEmail;
    private String noMobile;

    public MyPageResponse(User user) {
        this.idUser   = user.getIdUser();
        this.nmUser   = user.getNmUser();
        this.nmEmail  = user.getNmEmail();
        this.noMobile = user.getNoMobile();
    }
}
