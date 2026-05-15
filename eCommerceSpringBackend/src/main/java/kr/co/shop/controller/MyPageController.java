package kr.co.shop.controller;

import jakarta.validation.Valid;
import kr.co.shop.dto.MyPageResponse;
import kr.co.shop.dto.MyPageUpdateRequest;
import kr.co.shop.service.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class MyPageController {
    private final MyPageService myPageService;

    @GetMapping("/api/my")
    public ResponseEntity<MyPageResponse> getMyInfo(
            @AuthenticationPrincipal String idUser){
        return ResponseEntity.ok(myPageService.getMyInfo(idUser));
    }

    @PutMapping("/api/my")
    public ResponseEntity<Map<String, String>> updateMyInfo(
            @AuthenticationPrincipal String idUser,
            @Valid @RequestBody MyPageUpdateRequest request){

        myPageService.updateMyInfo(idUser, request);
        return ResponseEntity.ok(Map.of("message", "사용자 정보가 수정되었습니다."));
    }

    @DeleteMapping("/api/my")
    public ResponseEntity<Map<String, String>> deleteMyInfo(
            @AuthenticationPrincipal String idUser){
        myPageService.deleteMyInfo(idUser);
        return ResponseEntity.ok(Map.of("message", "탈퇴를 요청했습니다."));
    }
}
