package kr.co.shop.service;

import kr.co.shop.common.exception.BusinessException;
import kr.co.shop.common.util.JwtUtil;
import kr.co.shop.common.util.UserConstants;
import kr.co.shop.domain.User;
import kr.co.shop.dto.LoginRequest;
import kr.co.shop.dto.LoginResponse;
import kr.co.shop.dto.SignupRequest;
import kr.co.shop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Transactional
    public void signup(SignupRequest request) {
        if (userRepository.existsByIdUser(request.getIdUser())) {
            throw new BusinessException("이미 사용 중인 아이디입니다.", HttpStatus.CONFLICT);
        }
        if (userRepository.existsByNmEmail(request.getNmEmail())) {
            throw new BusinessException("이미 사용 중인 이메일입니다.", HttpStatus.CONFLICT);
        }

        User user = User.builder()
                .idUser(request.getIdUser())
                .nmUser(request.getNmUser())
                .nmPaswd(request.getNmPaswd())
                .nmEncPaswd(passwordEncoder.encode(request.getNmPaswd()))
                .noMobile(request.getNoMobile())
                .nmEmail(request.getNmEmail())
                .stStatus(UserConstants.STATUS_NORMAL)    // ST01: 정상
                .cdUserType(UserConstants.TYPE_USER)      // 10: 일반사용자
                .noRegister(request.getIdUser())
                .daFirstDate(LocalDateTime.now())
                .build();

        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByIdUser(request.getIdUser())
                .orElseThrow(() ->
                        new BusinessException("아이디 또는 비밀번호가 올바르지 않습니다.", HttpStatus.UNAUTHORIZED));

        // ST01(정상) 상태만 로그인 허용
        if (!UserConstants.STATUS_NORMAL.equals(user.getStStatus())) {
            throw new BusinessException("사용할 수 없는 계정입니다.", HttpStatus.FORBIDDEN);
        }

        if (!passwordEncoder.matches(request.getNmPaswd(), user.getNmEncPaswd())) {
            throw new BusinessException("아이디 또는 비밀번호가 올바르지 않습니다.", HttpStatus.UNAUTHORIZED);
        }

        String token = jwtUtil.generateToken(user.getIdUser(), user.getCdUserType());

        return new LoginResponse(token, user.getIdUser(), user.getNmUser(), user.getCdUserType());
    }
}