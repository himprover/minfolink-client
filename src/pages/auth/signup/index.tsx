import {Alert} from 'components/common/Alert';
import type {NextPage} from 'next';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

interface SignUpState {
  accessToken: string;
  link: string;
  nickname: string;
  profile_image: string;
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
}

const Signup: NextPage = () => {
  const router = useRouter();
  const session = useSession();
  const [agree, setAgree] = useState<boolean>(false);

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      Alert.fire(
        '잘못된 접근',
        '로그인/회원가입 버튼을 통해 진행해주세요.',
        'error'
      ).then(() => router.push('/'));
    }
  }, [session.status]);

  return (
    <>
      {session.status === 'authenticated' && (
        <div>
          <div>가입하기</div>
          <img src={session.data!.user!.image!} />
          <h1>이름 : {session.data!.user!.name} </h1>
          <h1>이메일 : {session.data!.user!.email} </h1>
          <input
            type="checkbox"
            value="test"
            checked={agree}
            onChange={() => setAgree(state => !state)}
          />
          <button>가입</button>
        </div>
      )}
    </>
  );
};

export default Signup;
