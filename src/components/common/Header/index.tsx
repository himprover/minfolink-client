import {Session} from 'next-auth';
import {signIn, signOut} from 'next-auth/react';
import * as S from './styles';

interface HeaderProps {
  session: Session | null;
}

export const Header = ({session}: HeaderProps) => {
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
              <button
                type="button"
                onClick={() =>
                  signIn('facebook', {
                    callbackUrl: 'http://localhost:3000/auth/signin',
                  })
                }
              >
                로그인/회원가입
              </button>
            )}
          </S.NavItem>
        </S.NavItemContainer>
      </S.Nav>
    </S.Wrap>
  );
};
