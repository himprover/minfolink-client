import {ApiError} from '../error';

// 401
export class UnAuthorizedError extends ApiError {
  code = 401;
  name = 'UnauthorizedError';
  message = 'UnauthorizedError';
  alertTitle = '로그인 오류';
  alertText = '로그인에 실패했습니다.';
}

// 403
export class ForbiddenError extends ApiError {
  code = 403;
  name = 'ForbiddenError';
  message = 'ForbiddenError';
  redirectUrl = '/auth/signup';
  alertTitle = '회원정보없음';
  alertText = '가입되지 않은 회원입니다.<br />회원가입 페이지로 이동합니다.';
}
