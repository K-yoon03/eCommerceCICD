package kr.co.shop.dto;

import kr.co.shop.domain.User;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class AdminUserResponse {

    private final String idUser;
    private final String nmUser;
    private final String nmEmail;
    private final String noMobile;
    private final String stStatus;
    private final String cdUserType;
    private final LocalDateTime daFirstDate;

    public AdminUserResponse(User user) {
        this.idUser      = user.getIdUser();
        this.nmUser      = user.getNmUser();
        this.nmEmail     = user.getNmEmail();
        this.noMobile    = user.getNoMobile();
        this.stStatus    = user.getStStatus();
        this.cdUserType  = user.getCdUserType();
        this.daFirstDate = user.getDaFirstDate();
    }
}