package kr.co.shop.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Table(name = "TB_USER")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class User {

    @Id
    @Column(name = "ID_USER", length = 100)
    private String idUser;

    @Column(name = "NM_USER", length = 100, nullable = false)
    private String nmUser;

    @Column(name = "NM_PASWD", length = 256, nullable = false)
    private String nmPaswd;

    @Column(name = "NM_ENC_PASWD", length = 512)
    private String nmEncPaswd;

    @Column(name = "NO_MOBILE", length = 30, nullable = false)
    private String noMobile;

    @Column(name = "NM_EMAIL", length = 100, nullable = false)
    private String nmEmail;

    @Column(name = "ST_STATUS", length = 4, nullable = false)
    private String stStatus;   // ST01:정상, ST02:해지, ST03:가입요청, ST04:탈퇴요청

    @Column(name = "CD_USER_TYPE", length = 4, nullable = false)
    private String cdUserType; // 10:일반사용자, 20:관리자

    @Column(name = "NO_REGISTER", length = 30)
    private String noRegister;

    @Column(name = "DA_FIRST_DATE")
    private LocalDateTime daFirstDate;

    public void encodePassword(String encodedPassword) {
        this.nmEncPaswd = encodedPassword;
    }

    public void update(String nmUser, String nmEmail, String noMobile){
        this.nmUser = nmUser;
        this.nmEmail = nmEmail;
        this.noMobile = noMobile;
    }

    public void updateStatus(String statusWithdrawReq) {
        this.stStatus = statusWithdrawReq;
    }
}