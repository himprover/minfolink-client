import {atom} from 'recoil';

export interface SignupStateProps {
  accessToken: string;
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
}

export const SignupState = atom<SignupStateProps>({
  key: 'SignupState',
  default: {
    accessToken: '',
    terms: false,
    privacy: false,
    marketing: false,
  },
});
