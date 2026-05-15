package kr.co.shop.controller;

import kr.co.shop.dto.AdminOrderResponse;
import kr.co.shop.dto.AdminUserResponse;
import kr.co.shop.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    // 사용자 목록
    @GetMapping("/users")
    public ResponseEntity<List<AdminUserResponse>> getUsers() {
        return ResponseEntity.ok(adminService.getUsers());
    }

    // 사용자 상태 변경
    @PutMapping("/users/{idUser}/status")
    public ResponseEntity<Map<String, String>> updateUserStatus(
            @PathVariable String idUser,
            @RequestBody Map<String, String> body) {
        adminService.updateUserStatus(idUser, body.get("stStatus"));
        return ResponseEntity.ok(Map.of("message", "상태가 변경되었습니다."));
    }

    // 사용자 삭제
    @DeleteMapping("/users/{idUser}")
    public ResponseEntity<Map<String, String>> deleteUser(
            @PathVariable String idUser) {
        adminService.deleteUser(idUser);
        return ResponseEntity.ok(Map.of("message", "사용자가 삭제되었습니다."));
    }

    // 주문 목록
    @GetMapping("/orders")
    public ResponseEntity<List<AdminOrderResponse>> getOrders() {
        return ResponseEntity.ok(adminService.getOrders());
    }

    // 주문 상태 변경
    @PutMapping("/orders/{idOrder}/status")
    public ResponseEntity<Map<String, String>> updateOrderStatus(
            @PathVariable String idOrder,
            @RequestBody Map<String, String> body) {
        adminService.updateOrderStatus(idOrder, body.get("stOrder"));
        return ResponseEntity.ok(Map.of("message", "주문 상태가 변경되었습니다."));
    }
}