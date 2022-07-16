import {deleteSignOut} from 'core/apis/auth';
import {getUser} from 'core/apis/user';
import {signIn, signOut} from 'next-auth/react';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import cookie from 'react-cookies';
import {useQuery} from 'react-query';
import styled from 'styled-components';

export type UserProps = {
  id: string;
  email: string;
  link: string;
  nickname: string;
  profile_image: string;
  refresh_token: string;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
};

export const Header = () => {
  const router = useRouter();
  const user = useQuery('user', getUser, {retry: 0});
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Wrap>
      <Nav>
        <NavItemContainer>
          <NavItem>로고</NavItem>
          <NavItem>피드</NavItem>
        </NavItemContainer>
        <NavItemContainer>
          <NavItem>
            {user.isError || user.isLoading ? (
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
            ) : (
              <button
                type="button"
                onClick={() => {
                  cookie.save('accessToken', '', {path: '/', maxAge: 0});
                  cookie.save('refreshToken', '', {path: '/', maxAge: -0});
                  window.location.assign('/');
                }}
              >
                로그아웃
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
