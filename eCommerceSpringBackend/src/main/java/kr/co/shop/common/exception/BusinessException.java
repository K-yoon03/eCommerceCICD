package kr.co.shop.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

// 예외 핸들러 Claude 사용

@Getter
public class BusinessException extends RuntimeException {

    private final HttpStatus status;

    public BusinessException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}