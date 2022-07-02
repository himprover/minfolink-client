import styled from 'styled-components';
import {SignupFormInput} from '../SignupFormInput';
import {SignupFormPreview} from '../SignupFormPreview';

export const SignupForm = () => {
  return (
    <Wrap>
      <Row>
        <Title>회원가입</Title>
      </Row>
      <Row>
        <SignupFormPreview />
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
