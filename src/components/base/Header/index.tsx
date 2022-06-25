import {Session} from 'next-auth';
import {signIn, signOut} from 'next-auth/react';
import styled from 'styled-components';

interface HeaderProps {
  session: Session | null;
}

export const Header = ({session}: HeaderProps) => {
  return (
    <Wrap>
      <Nav>
        <NavItemContainer>
          <NavItem>로고</NavItem>
          <NavItem>피드</NavItem>
        </NavItemContainer>
        <NavItemContainer>
          <NavItem>
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
          </NavItem>
        </NavItemContainer>
      </Nav>
    </Wrap>
  );
};

const Wrap = styled.section``;
const Nav = styled.nav``;
const NavItemContainer = styled.ul``;
const NavItem = styled.li``;
