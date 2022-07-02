import {atom} from 'recoil';

export interface SignupStateProps {
  accessToken: string;
  link: string;
  nickname: string;
  profileImage: string;
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
}

export const SignupState = atom<SignupStateProps>({
  key: 'SignupState',
  default: {
    accessToken: '',
    link: '',
    nickname: '',
    profileImage: '',
    terms: false,
    privacy: false,
    marketing: false,
  },
});
