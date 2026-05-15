package kr.co.shop.common.util;

import kr.co.shop.domain.User;
import kr.co.shop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class AdminAccountInitializer implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${admin.id}")
    private String adminId;

    @Value("${admin.password}")
    private String adminPassword;

    @Override
    public void run(ApplicationArguments args) {
        if (userRepository.existsByIdUser(adminId)) {
            log.info("[AdminAccountInitializer] 관리자 계정이 이미 존재합니다: {}", adminId);
            return;
        }

        User admin = User.builder()
                .idUser(adminId)
                .nmUser("관리자")
                .nmPaswd(adminPassword)
                .nmEncPaswd(passwordEncoder.encode(adminPassword))
                .noMobile("000-0000-0000")
                .nmEmail("admin@shop.kr")
                .stStatus(UserConstants.STATUS_NORMAL)   // ST01: 정상
                .cdUserType(UserConstants.TYPE_ADMIN)    // 20: 관리자
                .noRegister("SYSTEM")
                .daFirstDate(LocalDateTime.now())
                .build();

        userRepository.save(admin);
        log.info("[AdminAccountInitializer] 관리자 계정 생성 완료: {}", adminId);
    }
}