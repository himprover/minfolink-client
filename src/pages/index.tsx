import type {NextPage} from 'next';
import {useSession} from 'next-auth/react';
import {useEffect} from 'react';

const Home: NextPage = () => {
  const session = useSession();
  useEffect(() => {
    console.log(session);
  }, [session]);
  return <div></div>;
};

export default Home;
