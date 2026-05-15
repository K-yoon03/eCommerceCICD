package kr.co.shop.service;

import kr.co.shop.common.exception.BusinessException;
import kr.co.shop.common.util.UserConstants;
import kr.co.shop.domain.User;
import kr.co.shop.dto.MyPageResponse;
import kr.co.shop.dto.MyPageUpdateRequest;
import kr.co.shop.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class MyPageService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public MyPageResponse getMyInfo(String idUser) {
        User user = userRepository.findByIdUser(idUser)
                .orElseThrow(() ->
                        new BusinessException("사용자를 찾을 수 없습니다.", HttpStatus.NOT_FOUND));
        return new MyPageResponse(user);
    }

    @Transactional
    public void updateMyInfo(String idUser, MyPageUpdateRequest request) {
        User user = userRepository.findByIdUser(idUser)
                .orElseThrow( () -> new BusinessException("사용자를 찾을 수 없습니다.", HttpStatus.NOT_FOUND));

        user.update(
                request.getNmUser(),
                request.getNmEmail(),
                request.getNoMobile()
        );
    }

    @Transactional
    public void deleteMyInfo(String idUser) {
        User user = userRepository.findByIdUser(idUser)
                .orElseThrow( () -> new BusinessException("사용자를 찾을 수 없습니다.", HttpStatus.NOT_FOUND));
        user.updateStatus(UserConstants.STATUS_WITHDRAW_REQ);
    }
}
