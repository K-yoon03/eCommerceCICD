package kr.co.shop.common.util;

// User Status 관리 파일 기법 : Claude

public final class UserConstants {

    private UserConstants() {}

    // 사용자 상태 (st_status)
    public static final String STATUS_NORMAL       = "ST01";  // 정상
    public static final String STATUS_SUSPENDED    = "ST02";  // 해지
    public static final String STATUS_WITHDRAW_REQ = "ST04";  // 탈퇴요청

    // 사용자 구분 (cd_user_type)
    public static final String TYPE_USER  = "10";  // 일반사용자
    public static final String TYPE_ADMIN = "20";  // 관리자
}