export class ApiError extends Error {
  code?: number;
  redirectUrl: string = '';
  alertTitle: string = '';
  alertText: string = '';
  notFound: boolean = false;
}

export class UnknownError extends ApiError {
  name = 'UnknownError';
  message = 'UnknownError';
  alertTitle = '처리 오류';
  alertText =
    '일시적인 문제가 발생했습니다. 지속된다면 고객센터에 문의해주세요.';
}
