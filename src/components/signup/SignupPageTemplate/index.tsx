import React from 'react';
import {useSession} from 'next-auth/react';

import styled from 'styled-components';

interface SignUpPageTemplateProps {
  children?: React.ReactNode;
}

export const SignupPageTemplate = ({children}: SignUpPageTemplateProps) => {
  const session = useSession();

  // 회원가입 페이지는 Header가 없어용
  return <Wrap>{session.status === 'authenticated' && children}</Wrap>;
};

const Wrap = styled.section``;
