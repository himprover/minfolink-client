import type {NextPage} from 'next';
import {signIn, signOut, useSession} from 'next-auth/react';

const Home: NextPage = () => {
  const {data, status} = useSession();
  return (
    <div>
      <button type="button" onClick={() => signIn()}>
        SignIn
      </button>
      <button type="button" onClick={() => signOut()}>
        SignOut
      </button>
      <h1>{data?.user?.name}</h1>
      <h3>{status}</h3>
    </div>
  );
};

export default Home;
