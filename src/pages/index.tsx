import {withUser} from 'components/base/Hoc/withUser';
import type {GetServerSidePropsContext, NextPage} from 'next';

const Home: NextPage = () => {
  return <div>메인</div>;
};

export const getServerSideProps = withUser(
  queryClient => async (context: GetServerSidePropsContext) => {
    return;
  }
);

export default Home;
