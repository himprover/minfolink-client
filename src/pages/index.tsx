import type {NextPage} from 'next';
import {signIn, signOut, useSession} from 'next-auth/react';
import {useEffect} from 'react';

const Home: NextPage = () => {
  const {data, status} = useSession();
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>
      <button type="button" onClick={() => signIn('facebook')}>
        SignIn
      </button>
      <button type="button" onClick={() => signOut()}>
        SignOut
      </button>
      <h1>{data?.expires}</h1>
      <h1>{data?.accessToken}</h1>
      <h1>{data?.user?.id}</h1>
      <h1>{data?.user?.name}</h1>
      <h1>{data?.user?.email}</h1>
      <h1>{data?.user?.image}</h1>
      <h3>{status}</h3>
    </div>
  );
};

export default Home;
