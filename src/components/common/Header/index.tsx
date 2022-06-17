import {Session} from 'next-auth';
import {signIn, signOut} from 'next-auth/react';
import Link from 'next/link';
import * as S from './style';

interface HeaderProps {
  session: Session | null;
}

export const Header = ({session}: HeaderProps) => {
  console.log(session);
  return (
    <S.Wrap>
      <S.Nav>
        <S.NavItemContainer>
          <S.NavItem>로고</S.NavItem>
          <S.NavItem>피드</S.NavItem>
        </S.NavItemContainer>
        <S.NavItemContainer>
          <S.NavItem>
            {session ? (
              <button type="button" onClick={() => signOut()}>
                로그아웃
              </button>
            ) : (
              <button type="button" onClick={() => signIn('facebook')}>
                로그인/회원가입
              </button>
            )}
          </S.NavItem>
        </S.NavItemContainer>
      </S.Nav>
    </S.Wrap>
  );
};
