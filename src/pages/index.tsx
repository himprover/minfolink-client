import type {NextPage} from 'next';
import {signIn, signOut, useSession} from 'next-auth/react';
import {useEffect} from 'react';

const Home: NextPage = () => {
  const {data, status} = useSession();
  useEffect(() => {}, [data]);
  return (
    <div>
      <button type="button" onClick={() => signIn('facebook')}>
        SignIn
      </button>
      <button type="button" onClick={() => signOut()}>
        SignOut
      </button>

      <h3>{status}</h3>
    </div>
  );
};

export default Home;
