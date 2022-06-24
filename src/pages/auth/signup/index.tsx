import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useState} from 'react';

const Signup: NextPage = () => {
  const router = useRouter();
  const accessToken = router.query.accessToken;

  const [agree, setAgree] = useState<boolean>(false);

  return (
    <div>
      <div>가입하기</div>
      <img />
      <input
        type="checkbox"
        value="test"
        checked={agree}
        onChange={() => setAgree(state => !state)}
      />
      <button>가입</button>
    </div>
  );
};

export default Signup;
