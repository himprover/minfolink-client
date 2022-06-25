import {SignupForm} from 'components/signup/SignupForm';
import {SignupPageTemplate} from 'components/signup/SignupPageTemplate';
import type {NextPage} from 'next';

const Signup: NextPage = () => {
  return (
    <SignupPageTemplate>
      <SignupForm />
    </SignupPageTemplate>
  );
};

export default Signup;
