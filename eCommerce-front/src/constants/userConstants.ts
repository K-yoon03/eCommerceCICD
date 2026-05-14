// 사용자 상태 (st_status)
export const USER_STATUS = {
  NORMAL: 'ST01',        // 정상
  SUSPENDED: 'ST02',    // 해지
  WITHDRAW_REQ: 'ST04', // 탈퇴요청
} as const

// 사용자 구분 (cd_user_type)
export const USER_TYPE = {
  USER: '10',   // 일반사용자
  ADMIN: '20',  // 관리자
} as const