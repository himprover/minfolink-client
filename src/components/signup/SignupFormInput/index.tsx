import {AxiosError} from 'axios';
import {Alert} from 'components/common/Alert';
import {
  useCheckboxHandlerWithRecoilImmer,
  useInputHandlerWithRecoilImmer,
} from 'core/hooks/recoil';
import {defaultInstance} from 'core/utils/axios';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil';
import {SignupState, SignupStateProps} from 'recoil/signup';
import styled from 'styled-components';

export const SignupFormInput = () => {
  const [signup, setSignup] = useRecoilState<SignupStateProps>(SignupState);
  const session = useSession();

  const router = useRouter();

  const linkHandler = useInputHandlerWithRecoilImmer(setSignup, 'link');
  const termsHandler = useCheckboxHandlerWithRecoilImmer(setSignup, 'terms');
  const privacyHandler = useCheckboxHandlerWithRecoilImmer(
    setSignup,
    'privacy'
  );
  const marketingHandler = useCheckboxHandlerWithRecoilImmer(
    setSignup,
    'marketing'
  );
  const signupHandler = async () => {
    if (signup.accessToken === '') {
      Alert.fire('세션 만료', '다시 시도해주세요.', 'error').then(() =>
        router.push('/')
      );
    }

    const url = '/auth/signup';
    const body = {...signup};

    try {
      await defaultInstance.post(url, body);
      Alert.fire('회원가입완료', '환영합니다.', 'success').then(() =>
        router.push('/')
      );
    } catch (error) {
      const status = (error as AxiosError).response!.status;
      console.log(status);
      switch (status) {
        case 400:
          Alert.fire(
            '잘못된 정보',
            '올바르지 않은 정보를 입력했습니다.<br />다시 시도해주세요',
            'error'
          );
          break;
        case 401:
          Alert.fire('세션 만료', '다시 시도해주세요', 'error').then(() =>
            router.push('/')
          );
          break;
        case 409:
          Alert.fire(
            '이미 가입된 회원',
            '이미 가입된 회원입니다.',
            'error'
          ).then(() => router.push('/'));
          break;
        default:
          Alert.fire(
            '일시적 오류',
            '일시적인 오류 입니다.<br/> 잠시 후 다시 시도해주세요.',
            'info'
          );
      }
    }
  };
  return (
    <FormContainer>
      <FormItem>
        이메일
        <input type="text" value={session.data!.user!.email!} readOnly />
      </FormItem>
      <FormItem>
        닉네임
        <input type="text" value={session.data!.user!.name!} readOnly />
      </FormItem>
      <FormItem>
        링크
        <input type="text" value={signup.link} onChange={linkHandler} />
      </FormItem>
      <FormItem>
        이용약관동의
        <input type="checkbox" checked={signup.terms} onChange={termsHandler} />
      </FormItem>
      <FormItem>
        개인정보동의
        <input
          type="checkbox"
          checked={signup.privacy}
          onChange={privacyHandler}
        />
      </FormItem>
      <FormItem>
        마케팅동의
        <input
          type="checkbox"
          checked={signup.marketing}
          onChange={marketingHandler}
        />
      </FormItem>
      <button
        onClick={() => {
          signupHandler();
        }}
      >
        가입
      </button>
    </FormContainer>
  );
};
const FormContainer = styled.div``;
const FormItem = styled.div``;
