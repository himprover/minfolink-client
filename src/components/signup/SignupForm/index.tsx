import styled from 'styled-components';
import {SignupFormInput} from '../SignupFormInput';

export const SignupForm = () => {
  return (
    <Wrap>
      <Row>
        <Title>회원가입</Title>
      </Row>
      <Row>
        <SignupFormInput />
      </Row>
    </Wrap>
  );
};

const Wrap = styled.article``;
const Title = styled.h1``;
const Row = styled.div``;
