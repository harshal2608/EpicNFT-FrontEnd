import React from 'react';
import styled from 'styled-components';
import Header from '../Header';
import Footer from '../Footer';

const LandingPageWrapper = styled.div`
  height: 100vh;
  background-color: #0d1116;
  overflow: scroll;
  text-align: center;
`;

const Container = styled.div`
  height: 100%;
  background-color: #0d1116;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LandingPage = () => {
  return (
    <LandingPageWrapper>
      <Container>
        <Header />
        <Footer />
      </Container>
    </LandingPageWrapper>
  );
};

export default LandingPage;
